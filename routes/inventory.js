var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	Inventory 		=		require('../models/inventory'),
	AWS				=		require('../lib/API/AWS/schicki_aws'),
//	AWS				=		require('aws-sdk'),
//	S3 				= 		require('aws-sdk/clients/s3'),
	Product			=		require('../models/product'),
	snippets		=		require('../public/lib/snippets.js'),
	title			=		'schicki';

const multer 		= 		require('multer'),
	  storage		=		multer.memoryStorage(),
	  upload 		= 		multer({ storage: storage });

//AWS.config.apiVersions = {
// s3: '2006-03-01',
  // other service API versions
//};
var s3 = new AWS.S3();


function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname,action:'/login', title:'login'});
	}
	else if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	else if(!req.user.isProfiled){
		res.redirect('/');
	}
	else if(!(req.user.isVendor||req.user.isVendorUser)){
		res.redirect('/');
	}
	else if(req.user.isVendorUser && !req._parsedUrl.pathname.startsWith('/stores/view')){
		res.redirect('/stores/view');
	}
	else{
		next();
	}
}
function checkStoreOwner(req, res, next){
	Vendor.findById(req.user.vendor_id, (err, gvendor)=>{
			if(gvendor.stores.includes(req.params.store_id) && req.user.isVendor){
				next();
			}else{
				res.redirect('/stores/view');
			}
	})
}
function checkVendor(req, res,next){
	if(!req.user.isVendor){
		res.redirect('/stores/view');
	}else{
		next();
	}
}
//Inventory console
router.get('/inventory/:store_id/store/:inventory_id/management', checkLogin, checkStoreOwner, (req, res)=>{
			Inventory.findById(req.params.inventory_id, (err, invn)=>{
				if(err){
					res.redirect(`/store/${req.params.inventory_id}`);
				}else{
					Store.findById(invn.storeId, 'storename inventory', (serr, lstore)=>{
						console.log(lstore);
						res.render('marketplace/store/updateinventory', {title : `${lstore.storename} Inventory`, store: lstore});
					})
				}
			});
});
//add new products to inventory
router.get('/inventory/:store_id/storeitems/:inventory_id/addnewitem', checkLogin, (req, res)=>{
	res.render('marketplace/products/additem', {storeId: req.params.store_id, inventoryId: req.params.inventory_id});
})

router.post('/inventory/:store_id/storeitems/:inventory_id/addnewitem', checkLogin, upload.single('productimg'), (req, res)=>{ 
	if(req.file && req.body){
		var ckey = `products/${req.params.store_id}/${req.params.inventory_id}/${req.file.originalname}`
								var inventoryId		=   req.params.inventory_id,
									productname 	= 	req.body.productname,
									description		=	req.body.description,
									sku				=	req.body.sku,
									stock			=	req.body.stockunits,
									price			=	req.body.price,
									url_path		=	`https://schicki-dev-bucket.s3.eu-west-3.amazonaws.com/products/${req.params.store_id}/${req.params.inventory_id}/`,
									productImage	=	req.file.originalname,
									params			=	{
															Bucket	:	"schicki-dev-bucket",
															ACL		: 	"public-read",
															Body	:	req.file.buffer,
															Key		:   ckey
														},
									product   		=	{inventoryId, productname, description, sku, stock, productImage, price, url_path}
	s3.putObject(params, (err, data)=>{
		if(err){
			console.log(err);
		}else{
				Product.create(product).then((nproduct)=>{  
															nproduct.otherImages.push(productImage);
															Inventory.findById(req.params.inventory_id, (i_err, finventory)=>{
																																if(i_err){
																																	
																																}else{
																																		finventory.stocklist.push(nproduct._id);
																																		finventory.save();
																																		res.render('marketplace/store/listitems', {inventory: null});
																																		}
															})
															nproduct.save();
															}).catch((err)=>{
																console.log(err);
															
															})
		}
	})
	}else{
		console.log('File missing');
	}
/*	
		productimg	=   `https://schicki-dev-bucket.s3.eu-west-3.amazonaws.com/products/${req.params.store_id}/${req.params.inventory_id}/${req.body.productimg}`
	//Product.create();
	console.log(req.params.store_id);
	console.log(req.params.inventory_id);
	res.redirect(`/inventory/${req.params.store_id}/storeitems/${req.params.inventory_id}/manageitems`); */
}); 

//list inventory
router.get('/inventory/:store_id/storeitems/:inventory_id/manageitems', checkLogin, (req, res)=>{
			Inventory.findById(req.params.inventory_id, (err, ffvn)=>{
				if(err){
						res.sendStatus(404);
				}else{
						var opt = {path:'stocklist', model:'product', select:'inventoryId stock productImage sku price url_path'};
						Inventory.populate(ffvn, opt, (nerr, nffvn)=>{
							if(nerr){
								console.log('not found: '+ nerr.message);
								res.sendStatus(404);
							}else{
								console.log("found inventory: " + nffvn);
								res.render('marketplace/store/listitems', {inventory: nffvn.stocklist});
							}
						});
					}
			})
})

module.exports	=		router;