var express			=		require('express'),
	router			=		express.Router(),
	AWS				=		require('../lib/API/AWS/schicki_aws'),
	Product			=		require('../models/product'),
 	Vendor 			=		require('../models/vendor');




var s3 = new AWS.S3();



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

router.get('/products/:productId/itemdetails', checkLogin, (req, res)=>{
																Product.findById(req.params.productId, (err, fprod)=>{
																	if(err){

																			}else{
																					res.render('marketplace/products/itemdetails', { product: fprod });
																				    console.log('details sent: '+ fprod );
																					}
																															})

															});

router.post('/:vendor_id/products/register', checkLogin, (req, res)=>{
	console.log(req.body);
	 res.rediret('/');
});

module.exports	=		router;