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
	else if( !req.user.isVendor && req._parsedUrl.pathname !== '/vendor/enroll' ){
		res.redirect('/vendor/enroll');
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
						res.render('marketplace/vendor/associationrequests', {title:'Association Requests' ,asusers: fvass.users})
					}else{
						res.redirect('/vendor/dashboard');
						
					}
				})
			})		
				
});
//approve association associationrequests
router.post('/vendor/user/:id/association/accept', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (err, gvendor)=>{
		if(err){
			console.log('vendor not found');
			//alert security
		}else{
		Association.findById(gvendor.association_id, (a_err, gasso)=>{
			gasso.users.forEach((l)=>{
				if(req.params.id.toString() === l.id.toString()){
					l.status = 100102;                                                       
				}
			})
			gasso.save();
		});
		var user,
		bs = res.render('forms/snippets/disassociatebtn', { user : req.params.id })
		res.send(bs);
		}
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
													/*Vendor.findByIdAndUpdate(req.user.vendor_id, {associate : false, association_id : null}, (err_UV, UV)=>{
																		
																		if(!err){
																			res.send('done');
																		}
																	})  */
																}
															})
										vendor.save();
														})
													})
//vendor dashboard
router.get('/vendor/dashboard', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, 'users stores malls associate level status', (err, vendor)=>{
		let vendorLevel = checkMaxlimits(req.user._id, vendor.level);
		res.render('marketplace/vendor/dashboard', {title: 'vendor dashboard', vendor, vendorLevel})	
	})
	
})

//register vendor
router.get('/vendor/enroll', checkLogin, (req, res)=>{
	Vendor.exists({_id: req.user.vendor_id}).then((exV)=>{
		if(exV){
			console.log('THIS IS IT ' + exV);
			res.redirect('/');
		}
		else{
			console.log('FoUND VENDOR IS ' + exV);
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
	
	console.log('vendor created successfully');
	}).catch((err)=>{
		console.log(err);
	});
	
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
				Vendor.findByIdAndRemove(req.user.vendor_id, (v_err, delVendor)=>{
					if(delVendor.stores.length > 0){
					delVendor.stores.forEach((x)=>{
													Store.findByIdAndRemove(x, (s_err, delStore)=>{
														console.log('deleted: ', delStore);
																	if(s_err){
																							console.log(s_err);
																						}
																					})
																						});
					}
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
						console.log(updUser);
						res.redirect('/');
					}
					});
				}
	
			});
	delete req.user.vendor_id;
});


router.get('/vendor/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});	

module.exports	=		router;