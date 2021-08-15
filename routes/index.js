var express			=		require('express');
var router			=		express.Router(),
	Snippets		=		require('../public/lib/snippets.js'),
	Notification	=		require('../models/notification'),
	title			=		'schicki';



//Index Routes
router.get('/', (req, res)=>{
	res.render('home', {title});
});
router.get('/notf/:id', (req, res)=>{
	Snippets.notf 	= 	true;
	Notification.findById(req.params.id,'notifications', (err, notifications)=>{
		console.log(notifications);
		let snips 		=	Snippets;
		let fz 			= 	res.render('forms/snippets/vendassocbtn', { snippets : snips, notif: notifications });
	    res.send(fz);
	} )
});
router.get('/*', (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});


module.exports	=		router;