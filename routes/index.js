var express			=		require('express');
var router			=		express.Router(),
	Notification	=		require('../models/notification'),
	title			=		'schicki';



//Index Routes
router.get('/', (req, res)=>{
	res.render('home', {title});
});

router.get('/*', (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});


module.exports	=		router;