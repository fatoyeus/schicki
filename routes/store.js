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
	if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	if(!req.user.isProfiled){
		res.redirect('/user/profile/new');
	}
	next();
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
	var store		=		req.body;
	Store.create(store).then((nstore)=>{
										    nstore.vendor_id	=	req.user.vendor_id;
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
	Store.find({ vendor_id: req.user.vendor_id },'_id storename status requestdate',(err, fs)=>{
		Vendor.findById(req.user.vendor_id, (err,fv)=>{
														vendor = fv;
														});
		res.render('marketplace/store/dashboard', {stores: fs, title: vendor + 'Stores'});
	});
	
});

module.exports	=		router;