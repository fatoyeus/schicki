let express			=		require('express'),
	router			=		express.Router(),
	User			= 		require('../models/user'),
	Email 			=		require('../models/email'),
	Phone			=		require('../models/phone'),
	Birthday 		=		require('../models/birthday'),
	Location 		=		require('../models/location'),
	Contact 		= 		require('../models/contact'),
	Vendor 			=		require('../models/vendor'),
	Association		=		require('../models/association'),
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
	User.findById(req.user._id, 'isProfiled', (err, user)=>{
		console.log('isprofiled: '+ user);
		if(user.isProfiled){
			res.redirect('/user/profile/show');
		}else{
			res.render('forms/users/newprofile', {title: 'create profile'});
		}
	})
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
	console.log(req.user);
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
//Search for association availability
router.get('/user/vendorsearch/:id/check', checkLogin, (req, res)=>{
	if(req.user.vendorAssoc === (100100)){
	Association.find({ vendorname : {$regex : `^${req.params.id}`, $options : 'i'}}, 'vendorname vendor_id', (err, fv)=>{ 
		  const root = create().ele('vendors');
				for(var i=0; i< fv.length; i++){
					const fw = root.ele('name');
					fw.att('data', fv[i].vendor_id);	
					fw.txt(fv[i].vendorname).up();
					}
		  const fx = root.end({format:'xml', prettyPrint:true});
			console.log(fx);
			res.set({'Content-Type' : 'text/xml'});
			res.send(fx);
					});
		}else{
			//alert security
			res.sendStatus(404);
			console.log('user is alread associated');
		}
																	});
//Associate user to vendor 
router.get('/user/vendor/associate', checkLogin, (req, res)=>{
	var avendor,
		asU,
		vendorname,
		asD;
	User.findById(req.user._id, '-password', (fu_err, guser)=>{
		if( guser.isVendor || guser.isVendorUser ){
							console.log('came here via e');
							res.redirect('/user/profile/show');
							}else if(guser.vendorAssoc !== 100100){
							Association.findById(guser.assocVendor, (a_err, fassoc)=>{
												var userassoc = false;
												if(fassoc){
													console.log('found vendor: '+ fassoc._id);
												fassoc.users.forEach((fu)=>{
																		if (guser._id.toString() === fu.id.toString()){
																							asD 	=	fu;
																							//update association status to user
																							guser.vendorAssoc = fu.status;
																							guser.save();
																							userassoc = true;
																							asU = {vendorname : fassoc.vendorname, user : asD };
																							console.log('I came via a');
																							res.render('forms/users/associatevendor', { title : 'Vendor Association', avendor: asU});
																		}
																});
												if(!userassoc){
																guser.vendorAssoc = 100100;
																guser.assocVendor = null;
																guser.save();
																console.log('I came via b');
																res.render('forms/users/associatevendor', { title : 'Vendor Association', avendor: null});
																}
												}else{
														guser.vendorAssoc = 100100;
														guser.assocVendor = null;
														guser.assUser_ind = null;
														guser.save();
														console.log('i came via here c');
														res.render('forms/users/associatevendor', { title : 'Vendor Association', avendor: null});
													} 
																					})
								
							}else{
								console.log('i came via here d');
								res.render('forms/users/associatevendor', { title : 'Vendor Association', avendor: null});
								}
														
														})
																});
//Request Association
router.post('/user/vendor/:id/associate', checkLogin,  (req, res)=>{
																	if(req.user.vendorAssoc === 100100){
																				var user  = {
																								id: req.user.id,
																								username: req.user.username
																							};
																				Association.findOne({vendor_id: req.params.id}, (err, fassc)=>{
																												if(fassc){
																															fassc.users.push(user);
																															fassc.save();
																															User.findByIdAndUpdate(	req.user._id, 
																																				   { 
																																						vendorAssoc: 100101,
																																						assocVendor: fassc._id,
																																					}, 
																															(err, auser)=>{
																																		/*	if(auser){
																																						req.user.vendorAssoc = 100101;
																																					} */
																																			var fyy = {
																																			vendorname : fassc.vendorname,
																																			rdate	   : new Date().toISOString(),
																																			status	   : 'Requested'
																																		 }
																																var fy;
																																let fz = res.render('forms/snippets/associate', {fy : fyy})
																																res.send(fz);


																																		});
																														
																														}else{
																																//alert security
																																res.sendStatus(404);
																																}													
																										});
																										}else{
																											//alert security
																											res.redirect('/user/vendor/associate');
																										}
																	});
//Accept granted association request
router.post('/user/vendor/associationaccept', checkLogin, (req, res)=>{
																		User.findById(req.user._id, '-password', (es_err, euser)=>{
																																	if(euser.assocVendor){
																																	Association.findById(euser.assocVendor, (ev_err, dfassoc)=>{
																																	if(dfassoc){
																																					dfassoc.users.forEach((fdu)=>{
																																						if (euser._id.toString() === fdu.id.toString()){
																																							//check if user request was granted
																																							if(fdu.status === 100102){
																																														fdu.status = 100103;
																																														euser.vendorAssoc = 100103;
																																														euser.save();
																																														res.sendStatus(200);
																																														}else{
																																														fdu.status;
																																														res.sendStatus(404);
																																														//alert security
																																														}
																																						}
																																					})
																																				}else{
																																					//Alert Security
																																					res.sendStatus(404);
																																				}
																																				dfassoc.save();
																																						});
																																	}else{
																																		//Alert Security
																																		res.sendStatus(404);
																																		res.redirect('/user/vendor/associate');
																																	}
																																	});
																	});
//Remove association request 
router.post('/user/vendor/disassociate', checkLogin, (req, res)=>{
	User.findById(req.user._id, '-password', (ds_err, duser)=>{
		if(duser.assocVendor){
			Association.findById(duser.assocVendor, (dv_err, dfassoc)=>{
							if(dfassoc){
	//									 dfassoc.users.splice(duser.assUser_ind, 1);
											dfassoc.users.forEach((fdu)=>{
												if (duser._id.toString() === fdu.id.toString()){
													console.log('I tried to remove');
													dfassoc.users.splice(dfassoc.users.indexOf(fdu), 1);
												}
											}) 
										}else{
											res.sendStatus(404);
										}
							dfassoc.save();
									});
			duser.assocVendor = null;
			duser.vendorAssoc = 100100;
			duser.save();
			res.sendStatus(200);
		}else{
			//Alert Security
			res.sendStatus(404);
			console.log('You have no existing association');
			res.redirect('/user/vendor/associate');
		}
	});
																	});
//delete user account
router.delete('/user/:id/profile/delete', checkLogin, (req, res)=>{
	User.findById(req.params.id, (err, user)=>{
		if(user.isVendor){
			res.redirect('/user/profile/show');
		}else{
			User.findByIdAndRemove(req.params.id, (u_err, foundUser)=>{
				if(foundUser){
					if(foundUser.billingAddress_id){
						Billing.findByIdAndRemove(foundUser.billingAddress_id,(b_err, foundBilling)=>{
							console.log('successfully deleted billing address');
						})
													}
					Contact.findByIdAndRemove(foundUser.contact_id, (c_err, delContact)=>{
						if(delContact){
							Location.findByIdAndRemove(delContact.userLocation_id, (l_err,delLocation)=>{
								if(delLocation){
									Email.findByIdAndRemove(delContact.userEmail_id, (e_err, delEmail)=>{
										if(delEmail){
											Phone.findByIdAndRemove(delContact.userPhone_id, (p_err, delPhone)=>{
												if(delPhone){
													res.redirect('/logout');
												}else{
													console.log('Phone not found');
												}
											})
										}else{
											console.log('Email not found');
										}
									})
								}else{
									console.log('User location not found');
								}
							})
						}else{
							console.log('User contact not found');
						}
					})	
				console.log('User account successfully deleted');
				}else{
				console.log('User not found')
				}
			});
				}
			})
																	});
//default route
router.get('/user/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
												});

module.exports		=		router;