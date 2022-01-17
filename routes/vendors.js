var 	express			=		require('express'),
	 	router			=		express.Router(),
		User			= 		require('../models/user'),
		Vendor 			=		require('../models/vendor'),
		VendorContact	=		require('../models/vendorcontact'),
		sha256			=		require('crypto-js/sha256'),
		VendorEmail   	=		require('../models/vendoremail'),
		VendorPhone		=		require('../models/vendorphone'),
		VendorLocation	=		require('../models/vendorlocation'),
		Association		=		require('../models/association'),
		Store			=		require('../models/store'),
		snippets		=		require('../lib/utilities/snippets.js'),
		title			=		'schicki';
const 	vlevel			=  		require('../templates/vendorlevel');
	



function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname, action:'/login', title:'login'});
	}
	else if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	else if(!req.user.isProfiled){
		res.redirect('/user/profile/new');
	}
	else if(!req.user.isVendor && req._parsedUrl.pathname !== '/vendor/enroll' ){
		if(req.user.isVendorUser){
			console.log('I got here');
				res.redirect('/stores/view');
		}else{
				res.redirect('/vendor/enroll');
		}
	}else{
		next();
	}
}
//check resource limits for vendors
function checklimits(g,h,i){
							vlevel.forEach((r)=>{ 
													if (sha256(r.id + h) === i ){
													 								return r.g;
																				}
												})
																
							}
function checkMaxlimits(j,k){
							 var package
							 vlevel.forEach((r)=>{   
												 	if (sha256(r.id + j).toString() === k ){
																								package = r;
																							}
												})
								return package;								
							}
//vendor routes
//enable vendor association
router.post('/vendor/association', checkLogin, (req, res)=>{
								console.log('association ongoing')
								var vendorname;
									Vendor.findById(req.user.vendor_id, 'vendorname', (err, vendor)=>{
										vendorname 			= 	vendor.vendorname;
										var vendor_id 		= 	req.user.vendor_id;
										var associatedV		=	{vendorname, vendor_id};	
											Association.create(associatedV).then((aV)=>{
												Vendor.findByIdAndUpdate(req.user.vendor_id, {associate : true, association_id : aV._id},  (err, UV)=>{
														
													})										
																								}).catch((err)=>{
																										if(!err){
																											res.send('done');
																										}else{
																											console.log(err);
																										}
																						})
																		})
															})
//read association requests
router.get('/vendor/associationrequests', checkLogin, (req, res)=>{
			Vendor.findById(req.user.vendor_id, 'association_id', (ar_err, fasv)=>{
				Association.findById(fasv.association_id, (fs_err, fvass)=>{
					if(fs_err){
						console.log(fs_err);
						res.redirect('/vendor/dashboard');
					}else if(fvass){
						var asusers;
						res.render('marketplace/vendor/associationrequests', {title:'Association Requests', asusers: fvass.users})
					}else{
						res.redirect('/vendor/dashboard');
						
					}
				})
			})		
				
});

//disable vendor association
router.post('/vendor/disassociation', checkLogin, (req, res)=>{
								var vendorname;
									Vendor.findById(req.user.vendor_id, 'association_id', (err, vendor)=>{
										Association.findByIdAndRemove(vendor.association_id, (asso_err, AS)=>{
																											if(AS){
																													vendor.associate 				=	false;
																													vendor.association_id 			= 	null;
																													vendor.save();
																													}
															})
										
														})
													})
//vendor dashboard
router.get('/vendor/dashboard', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, 'vendorname users stores malls associate level status', (err, vendor)=>{
		let vendorLevel = checkMaxlimits(req.user._id, vendor.level);
		res.render('marketplace/vendor/dashboard', {title: 'vendor dashboard', vendor, vendorLevel})	
	})
	
})
//register vendor
router.get('/vendor/enroll', checkLogin, (req, res)=>{
	Vendor.exists({_id: req.user.vendor_id}).then((exV)=>{
		if(exV){
			res.redirect('/');
		}
		else{
			res.render('forms/vendors/register', {title:'register vendor'});
		}
	})
});
//creating a vendor
router.post('/vendor/enroll', checkLogin, (req, res)=>{
	var vendorname			=	req.body.vendorname;
	var user_id				=	req.user._id;
	var email				= 	req.body.email;
	var phone				= 	req.body.phone;
	var country				= 	req.body.country;
	var address				= 	req.body.address;
	var city				=	req.body.city;
	var state				=	req.body.state;
	var zipcode				= 	req.body.zipcode;
	const 	level			=	sha256(vlevel[0].id + req.user._id);
		
	var vendorEmail			=	{email};
	var vendorPhone			=   {phone};
	var vendorLocation		=	{country, address, city, state, zipcode};
	var contact				=	{email, phone, vendorLocation};
	var vendor				=	{vendorname, user_id, level};
	
	
	
	Vendor.create(vendor).then((nvendor)=>{
			VendorContact.create(contact).then((vendorcontact)=>{
																	vendorcontact.vendor_id = nvendor._id;
																	
			VendorEmail.create(vendorEmail).then((nvendoremail)=>{															
																	vendorcontact.email_id 	= nvendoremail._id;
			VendorLocation.create(vendorLocation).then((vendorlocation)=>{
																	vendorcontact.vendorlocation_id = vendorlocation._id;
			VendorPhone.create(vendorPhone).then((vendorphone)=>{
																	vendorcontact.phone_id = vendorphone._id;
																	vendorcontact.save();
																	}).catch((err)=>{
																						console.log(err);
																				});
												}).catch((err)=>{
																console.log(err);
															});
								}).catch((err)=>{
												console.log(err);
											});
			
			
		
			
			nvendor.contact_id = vendorcontact._id;
			nvendor.save();
			User.findByIdAndUpdate(req.user._id, { vendor_id : nvendor._id }, (err)=>{
				if(err){
					console.log(err.message);
				}
			});
			}).catch((err)=>{
							console.log(err);
							});
	}).catch((err)=>{
		console.log(err);
	});
	req.notify(1013, req.user.notification_id);
	res.redirect('/');
});
//show vendor profile
router.get('/vendor/profile/show', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id).populate('contact_id').exec((err, foundVendor)=>{
																							if(err){
																								console.log(err.message);
																								}else{
									var opts = [
									{path:'contact_id.email_id', model:'vendoremail'},
									{path:'contact_id.phone_id', model:'vendorphone'},
									{path:'contact_id.vendorlocation_id', model:'vendorlocation'}
									]
		foundVendor.stores.forEach((x)=>{
						console.log(x);
		});
		Vendor.populate(foundVendor, opts,(err,exfoundVendor)=>{
									var vprofile;
									if(err){
									    console.log(err.messagea);
										}else{
										console.log(exfoundVendor);
										res.render('forms/vendors/showprofile',{ vprofile: exfoundVendor, title:exfoundVendor.vendorname 													});
																	}
										});																															}
					});
			});
//Delete vendor account
router.delete('/vendor/profile/delete', checkLogin, (req, res)=>{
		Vendor.findById(req.user.vendor_id, (vd_err, fd_vendor)=>{
			if(fd_vendor.stores.length > 0){
						//alert vendor delete all stores
						console.log('delete all stores first')
						res.redirect('/vendor/profile/show');
					}
					else if(fd_vendor.users.length > 0){
						//alert vendor to remove all associated users
						console.log('remove all associated users');
						res.redirect('/vendor/profile/show');
					}
					else{
							Vendor.findByIdAndRemove(req.user.vendor_id, (v_err, delVendor)=>{
							VendorContact.findByIdAndRemove(delVendor.contact_id, (contact_err, delContact)=>{
							if(delContact){
							VendorEmail.findByIdAndRemove(delContact.email_id, (email_err, delemail)=>{
								if(delemail){
								VendorPhone.findByIdAndRemove(delContact.phone_id, (phone_err, delphone)=>{
									if(delphone){
										VendorLocation.findByIdAndRemove(delContact.vendorlocation_id, (location_err, dellocation)=>{
											if(dellocation){
												Association.findByIdAndRemove(req.user.vendor_id, (association_err, delassociation)=>{
													if(delassociation){
														
													}else{
														console.log('association not found');
													}
												})
											}else{
												console.log('vendor location not found');
											}
										});
									}else{
										console.log('vendor phone not found');
									}
								});
							}else{
								console.log('vendor email not found');
							}
						});	
						}else {
							console.log('vendor contact not found');
						}
						
						
						
					})
					if(v_err){
						console.log(v_err.message)
					}else{ 
					User.findByIdAndUpdate(req.user._id,{isVendor: false},(u_err, updUser)=>{
					if(u_err){
						console.log(u_err.message);
					}else{
							res.redirect('/');
						}
					});
				}
																					});
					}
		});
				
	delete req.user.vendor_id;
});
//approve association associationrequests
router.post('/vendor/user/:id/association/accept', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (err, gvendor)=>{
		if(err){
			console.log('vendor not found');
			//alert security
		}else{
		Association.findById(gvendor.association_id, (a_err, gasso)=>{
			var snip = snippets;	
		
			gasso.users.forEach((l)=>{
				if(req.params.id.toString() === l.id.toString()){
					l.status 	= 	100102;
					snip.userd 	=	l;	
				}
			})
			
			gasso.save();
			//var	rs = 
			res.render('forms/snippets/vendassocbtn', { snippets : snip })
			//res.send(rs);
		});
		
		}
	})
	
});
//admit user association
router.post('/vendor/user/:id/association/admit', checkLogin, (req, res)=>{
	console.log('i got called');
	Vendor.findById(req.user.vendor_id, (i_err, ivendor)=>{
		if(i_err){
			console.log('vendor not found');
			//alert security
		}else{	
				User.findByIdAndUpdate(req.params.id, {
														isVendorUser 	: 	true,
														vendorAssoc		:	100104,	
														assocVendor		:	null,
														vendor_id		:	ivendor._id
													  },
									  								(err, u_user)=>{
																	if(err){
																			res.sendStatus(404);
																			}
																	if(u_user && !ivendor.users.includes(u_user._id)){
																				ivendor.users.push(u_user._id);
																				ivendor.save();
																				Association.findById(ivendor.association_id, (j_err, iasso)=>{
																													iasso.users.splice(iasso.users.indexOf(req.params.id));
																																		iasso.save();
																																		res.sendStatus(200);
																																			});
																				}
																						}	
									 												);
																				}
																			})
																		})
//reject or disassociate associationrequests
router.post('/vendor/user/:id/association/reject', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (err, hvendor)=>{
		if(err){
			console.log('vendor not found');
			//alert security
		}else{
		Association.findById(hvendor.association_id, (a_err, hasso)=>{
																		/*hasso.users.forEach((l,m,n)=>{
																			if(req.params.id.toString() === l.id.toString()){
																				n.splice(m, 1);
																			}
																		})*/
																		hasso.users.splice(hasso.users.indexOf(req.params.id));
																		hasso.save();
																		res.sendStatus(200);
																		});
		}
	})
	
});
//default route
router.get('/vendor/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});	

module.exports	=		router;