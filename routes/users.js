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
																
			User.findByIdAndUpdate(req.user._id, {birthday_id : nUserBirthday._id}, (b_err, foundUser)=>{
																					if(b_err||!foundUser){
																						console.log('Unable to create profile');
																						res.redirect('/');
																						}else{
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
														}
													});														
												}).catch((err)=>{
													console.log(err);
											});
	
	
	console.log('User profile updated successfully');
	res.redirect('/');
		
});
//user profile view
router.get('/user/profile/show', checkLogin, (req, res)=>{
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

//Search for vendor availability
router.get('/user/vendorsearch/:id/check', checkLogin, (req, res)=>{
	Vendor.find({ vendorname : {$regex : `^${req.params.id}`, $options : 'i'}}, 'vendorname', (err, fv)=>{
		  const root = create().ele('vendors');
				for(var i=0; i< fv.length; i++){
					const fw = root.ele('name');
	//				fw.att('data', fv[i].vendorname);	
					fw.txt(fv[i].vendorname).up();
					}
		  const fx = root.end({format:'xml', prettyPrint:true});
			console.log(fx);
			res.set({'Content-Type' : 'text/xml'});
			res.send(fx);
		});
	});

//Associate 
router.get('/user/vendor/associate', checkLogin, (req, res)=>{
	res.render('forms/users/associatevendor', { title : 'Vendor Association'});
});

router.post('/user/vendor/associate', checkLogin,  (req, res)=>{
	User.findByIdAndUpdate(req.user._id, {isVendorUser : true, vendorAssoc : req.body.vendorname}, (err, user)=>{
		
	});
});
//delete user account
router.delete('/user/:id/profile/delete', checkLogin, (req, res)=>{
	User.findById(req.params.id, (err, user)=>{
		if(user.isVendor){
			res.redirect('/user/:id/profile/show');
		}else{
			User.findByIdAndRemove(req.params.id, (u_err, foundUser)=>{
				if(foundUser){
					if(foundUser.billingAddress_id){
						Billing.findByIdAndRemove(foundUser.billingAddress_id,(b_err, foundBilling)=>{
							console.log('successfully deleted billing address');
						})
					}
				Contact.findByIdAndRemove(foundUser.contact_id, (c_err, foundContact)=>{
						if(foundContact){
							Location.findByIdAndRemove(foundContact.userLocation_id, (l_err,foundLocation)=>{
								if(foundLocation){
									res.redirect('/logout');
									console.log('User account successfully deleted')
								}else{
									console.log('User location not found');
								}
							})
						}else{
							console.log('User contact not found');
						}
																									})	
																								}else{
																									console.log('User not found')
																								}
		
				});
		}
	})
	
});

router.get('/user/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});

module.exports	=		router;