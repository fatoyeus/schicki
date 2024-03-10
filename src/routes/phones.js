let express			=		require('express'),
	router			=		express.Router(),
	User			= 		require('../models/user'),
	Email 			=		require('../models/email'),
	Phone			=		require('../models/phone'),
	Birthday 		=		require('../models/birthday'),
	Location 		=		require('../models/location'),
	Contact 		= 		require('../models/contact'),
	Vendor 			=		require('../models/vendor'),
	Billing			=		require('../models/billinglocation'),
	title			=		'schicki';
	const{create}	=		require('xmlbuilder2');
	

function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname, action:'/login', title:'login'});
	}
	if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	next();
}


//search phone number
router.get('/phone/search/:id/check', checkLogin, (req, res)=>{
	Phone.exists({phone: req.params.id}, (err, phone)=>{
		console.log('phone is: '+ phone);
		res.send(phone);
	});
});

module.exports	=		router;