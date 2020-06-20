let express			=		require('express'),
	router			=		express.Router(),
	User			= 		require('../models/user'),
	Email 			=		require('../models/email'),
	Phone			=		require('../models/phone'),
	Birthday 		=		require('../models/birthday'),
	Location 		=		require('../models/location'),
	Contact 		= 		require('../models/contact'),
	Vendor 			=		require('../models/vendor'),
	title			=		'schicki';
	

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


//user routes
//create user profile
router.get('/user/profile/new', checkLogin, (req, res)=>{
	res.render('forms/users/newprofile', {title: 'create profile'});
});

router.post('/user/profile/new', checkLogin, (req, res)=>{  
	var email 		= 	req.body.email,
		phone 		=	req.body.phone,
		birthday	=	req.body.birthday,
		country		=	req.body.country,
		address		=	req.body.address,
		city		=	req.body.city,
		state		=	req.body.state,
		zipcode		=	req.body.zipcode;
	
	var userEmail		= 	{email},
		userPhone		=	{phone},
		userBirthday	=	{birthday},
		userLocation	=	{country, address, city, state, zipcode},
		contact			=	{userEmail, userPhone, userLocation};
	
	Birthday.create(userBirthday).then((nUserBirthday)=>{
																
			User.findByIdAndUpdate(req.user._id, {birthday_id : nUserBirthday._id}, (err, foundUser)=>{
																							if(err||!foundUser){
																								console.log('No user found');
																								res.redirect('/');
																							}
																						});														
															}).catch((err)=>{
																console.log(err);
															});
	Contact.create(contact).then((usercontact)=>{
		
			Email.create(userEmail).then((nUserEmail)=>{
														usercontact.userEmail_id = nUserEmail._id;
														console.log('email created');
		    Phone.create(userPhone).then((nUserPhone)=>{
														usercontact.userPhone_id = nUserPhone._id;
														console.log('phone created');
			Location.create(userLocation).then((nUserLocation)=>{
																usercontact.userLocation_id = nUserLocation._id;
																usercontact.save();
																console.log('location created and contact saved');
															}).catch((err)=>{
																console.log(err);
															});	
													}).catch((err)=>{
														console.log(err);
													});
										}).catch((err)=>{
											console.log(err);
										});
						
			
			
			
			
			User.findByIdAndUpdate(req.user._id, {isProfiled : true, contact_id : usercontact._id}, (err, foundUser)=>{
				if(err||!foundUser){
					console.log(err.message);
					res.redirect('/');
				}
		})
	}).catch((err)=>{
			console.log(err.message);
		});
	
	console.log('User profile updated successfully');
	res.redirect('/');
		
});
//user profile view
router.get('/user/:id/profile/show', checkLogin, (req, res)=>{
	User.findById(req.user._id, '-password').populate(['contact_id','birthday_id']).exec((err, foundUser)=>{
																			if (err){
																			    						 																										console.log(err.message);
																		       							 }
																				else{
				var opts = [{ path:'contact_id.userEmail_id', model:'email' },
						    { path:'contact_id.userLocation_id', model:'location' },
						    { path:'contact_id.userPhone_id', model:'phone'},
							{ path:'birthday_id', model:'birthday'}
						   ];																	
	User.populate(foundUser, opts, (err,exfoundUser)=>{
		var userProfile;
		if(err){
			console.log(err.message);
		}else{
			res.render('forms/users/showprofile', {userProfile : exfoundUser, title: req.user.fullName});
		}
	});
															}
														});
													});
//delete user account
router.get('/user/:id/profile/delete', checkLogin, (req, res)=>{
	User.findById(req.params.id, (err, user)=>{
		if(user.isVendor){
			console.log('Delete vendor account first');
			res.redirect('/user/:id/profile/show');
		}else{
			User.findByIdAndRemove(req.params.id, (u_err, foundUser)=>{
				
		
				});
		}
	})
	
});

router.get('/user/*', checkLogin, (req, res)=>{
	res.render('pnf', {title: 'page not found'});
});

module.exports	=		router;