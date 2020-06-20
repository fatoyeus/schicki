var express			=		require('express'),
	router			=		express.Router(),
 	Vendor 			=		require('../models/vendor');

function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname, title:'login'});
	}
	if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	next();
}

//Product routes 

router.get('/:vendor_id/products/register', (req, res)=>{
	 res.render('forms/products/register');
});

router.post('/:vendor_id/products/register', (req, res)=>{
	console.log(req.body);
	 res.rediret('/');
});

module.exports	=		router;