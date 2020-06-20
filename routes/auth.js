var express			=		require('express'),
	router			=		express.Router(),
	bcrypt			=		require('bcryptjs'),
	User			= 		require('../models/user'),
	Admin			=		require('../models/admin'),
	AdminEmail		=		require('../models/adminemail'),
	title			=		'schicki',
	lastChecked,
	action;
	



function checkLogin(req, res, next){
	var lastChecked;
	console.log('aut cecked');
	if(req.admin){
				req.schikiSession.adminId = null; 
	}
	if(!req.user){
		return res.redirect('/login', {lastChecked: req._parsedUrl.pathname, action:'/login', title:'login'});
	}
	next();
}

function prevRelogin(req, res, next){
	if(req.admin){
				req.schikiSession.adminId = null; 
	}
	if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	next();
}

function prevResignup(req, res, next){
	if(req.admin){
				req.schikiSession.adminId = null; 
	}
	if( req.user && req._parsedUrl.pathname === '/register' ){
		return res.redirect('/');
	}
	next();
}



//Authentication routes
router.get('/register', prevResignup, (req, res)=>{
	res.render('forms/authentication/register', {title:'sign up'})
});
router.post('/register', (req, res)=>{
	
	let hash = bcrypt.hashSync(req.body.password, 14);
	req.body.password = hash;
	req.body.cpassword = undefined;
	
//create new user	
	let user = new User(req.body);
//save user to the database
	user.save((err)=>{
		if (err){
			let error = 'something went wrong';
			
			if(err.code === 11000) {
				error =  'email is already taken, please try another';
			}
			return res.render('forms/authentication/register', {error: error, title:'register'});
		}else{
			
			res.redirect('/login');
		}
		
	}); 
	
	
	});

//login
router.get('/login', prevRelogin, (req, res, next)=>{
	res.render('forms/authentication/login', {lastChecked:null, action:'/login', title:'login'});
});

router.post('/login', (req, res)=>{
	User.findOne({username: req.body.username}, (err, user)=>{
		if( !user || !bcrypt.compareSync(req.body.password, user.password)){
			var error;
			return res.render('forms/authentication/login', {
				error : 'Incorrect email / password.', lastChecked: null, action:'/login', title:'login'
			});
		}
		req.schikiSession.userId  = user._id;
		req.schikiSession.adminId = null;
		if(!req.body.lastChecked){
			res.redirect('/');
		}else{
			res.redirect(req.body.lastChecked);
		};
		
	});
});



router.get('/logout', (req, res)=>{
	if(req.schikiSession.userId){
		req.schikiSession.userId  = null;
	} if(req.schikiSession.adminId){
		req.schikiSession.adminId = null;
	}
	res.redirect('/');
});


module.exports	=		router;