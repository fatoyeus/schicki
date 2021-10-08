var express			=		require('express'),
	router			=		express.Router(),
	AWS				=		require('aws-sdk'),
	S3 				= 		require('aws-sdk/clients/s3'),
	uuid			=		require('uuid'),
 	Vendor 			=		require('../models/vendor');

var bucketName = 'schickidev' + uuid.v4();
AWS.config.apiVersions = {
  s3: '2006-03-01',
  // other service API versions
};

var s3 = new AWS.S3();
var BucketPromise	=		s3.createBucket({Bucket: bucketName}).promise().then().catch((err)=>{console.log(err, err.stack)});


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