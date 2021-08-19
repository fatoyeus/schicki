var express			=		require('express'),
	router			=		express.Router(),
	bcrypt			=		require('bcryptjs'),
	User			= 		require('../models/user'),
	Notification	= 		require('../models/notification'),
	Admin			=		require('../models/admin'),
	AdminEmail		=		require('../models/adminemail'),
	title			=		'schicki',
	lastChecked,
	action;
	



function checkLogin(req, res, next){
	var lastChecked;
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
										Notification.create({userId	:	user._id}).then((userN)=>{
																									user.notification_id = userN._id;
																									userN.save();
																									//save user to the database
																									user.save((err)=>{
																									if (err){
																										let error = 'something went wrong';

																										if(err.code === 11000) {
																											error =  'username is already taken, please try another';
																										}
																						return res.render('forms/authentication/register', {error: error, title:'register'});
																									}else{
																										req.notify(userN._id, 1001, 1002);
																										//req.notify(1002, userN._id);
																										}

																														}); 
																									
																									res.redirect('/login');
																								})
});

//login
router.get('/login', prevRelogin, (req, res, next)=>{
	res.render('forms/authentication/login', {lastChecked:null, action:'/login', title:'login'});
});

router.post('/login', (req, res)=>{
	User.findOne({ username : {$regex : `^${req.body.username}`, $options : 'i'}}, (err, user)=>{
		if( !user || !bcrypt.compareSync(req.body.password, user.password)){
			var error;
			return res.render('forms/authentication/login', {
				error : 'Incorrect email / password.', lastChecked: null, action:'/login', title:'login'
			});
		}else{	
				//polyfill for users without notification schema;
				if(!user.notification_id){
					Notification.create({userId	:	user._id}).then((userN)=>{
																				user.notification_id = userN._id;
																									userN.save();
																									user.save();
					})
				}else{
					Notification.findById(user.notification_id , (d_err, notf)=>{
						if(!notf){
									Notification.create({userId	:	user._id}).then((userN)=>{
																						user.notification_id = userN._id;
																											userN.save();
																											user.save();
									})
						}
						
					})
				}
				req.schikiSession.userId  = user._id;
				req.schikiSession.adminId = null;	
				
				if(!req.body.lastChecked){
					res.redirect('/');
				}else{
						res.redirect(req.body.lastChecked);
						};
				}
	});
});



router.get('/logout', (req, res)=>{
	if(req.schikiSession.userId){
		req.schikiSession.userId  = null;
		res.redirect('/');
	}else if(req.schikiSession.adminId){
		req.schikiSession.adminId = null;
		res.redirect('/admin/dashboard');
	}
	
});


module.exports	=		router;