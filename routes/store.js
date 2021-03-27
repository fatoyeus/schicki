var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	title			=		'schicki';

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
	else if(!req.user.isVendor){
		res.redirect('/');
	}
	else{
		next();
	}
}
function checkstore(req, res, next){
	
}
//Create a Store
router.get('/store/create', checkLogin, (req, res)=>{
	Storecat.find({status: 222}, (err, categories)=>{
		var cat;
		console.log(categories.length);
		res.render('marketplace/store/register', {title:'Create Store', cat: categories});
	});
});

router.post('/store/create', checkLogin, (req, res)=>{
	Store.create(req.body).then((nstore)=>{
											Vendor.findById(req.user.vendor_id, (err, fvendor)=>{
																				fvendor.stores.push(nstore._id);
																				fvendor.save();
																				});
										    nstore.vendor_id	=	req.user.vendor_id;
											nstore.save();
											res.redirect('/stores/view');
										}).catch((err)=>{
															console.log(err.message);
									});
	
							});

//Search store availability
router.get('/store/search/:id/check', checkLogin, (req, res)=>{
	Store.find({ storename : {$regex : `^${req.params.id}`, $options : 'i'}}, 'storename', (err, store)=>{
		console.log('store is: '+ store.length);
		if (store.length > 0){
			res.send(false);
		}else{
			res.send(true);
		}
	})
});

//show stores

router.get('/stores/view', checkLogin, (req, res)=>{
	var vendor,
		stores;
	Vendor.findById(req.user.vendor_id, (err, fv)=>{
		if(fv){
			vendor = fv;
				Store.find({ vendor_id: req.user.vendor_id },'_id storename status requestdate', (err, fs)=>{
					res.render('marketplace/store/dashboard', {stores: fs, title: vendor.vendorname + ' Stores'});
						});
				}
			});
	});
router.get('/stores/view/:store_id/detail', checkLogin, (req, res)=>{
	var store;
	Store.findById(req.params.store_id, (err, fstore)=>{
		if(err){
			res.redirect('/stores/view');
		}
		else if(fstore.vendor_id.toString !== req.user.vendor_id.toString || fstore.status === 'Blocked'){
			res.redirect('/stores/view');
			
		}else{
			res.render('marketplace/store/managestore', {store: fstore, title: fstore.storename})
		}
	});
});
module.exports	=		router;