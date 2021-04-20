var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	Inventory 		=		require('../models/inventory'),
	snippets		=		require('../public/lib/snippets.js'),
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

module.exports	=		router;