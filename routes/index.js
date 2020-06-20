var express			=		require('express');
var router			=		express.Router(),
	title			=		'schicki';



//Index Routes
router.get('/', (req, res)=>{
	res.render('home', {title});
});
router.get('/*', (req, res)=>{
	res.render('pnf', {title: 'page not found'});
});

module.exports	=		router;