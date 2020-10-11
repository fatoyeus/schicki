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
	Store.exists({storename: req.params.id}, (err, store)=>{
		console.log('store is: '+ store);
		if (store){
			res.sendStatus(440);
		}else{
			res.sendStatus(220);
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
			console.log('vendor: ' + fv);
				Store.find({ vendor_id: req.user.vendor_id },'_id storename status requestdate', (err, fs)=>{
					res.render('marketplace/store/dashboard', {stores: fs, title: vendor.vendorname + ' Stores'});
						});
				}
			});
	});

module.exports	=		router;