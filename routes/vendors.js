var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	VendorContact	=		require('../models/vendorcontact'),
	VendorEmail   	=		require('../models/vendoremail'),
	VendorPhone		=		require('../models/vendorphone'),
	VendorLocation	=		require('../models/vendorlocation'),
	title			=		'schicki';

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

//vendor routes
//vendor dashboard
router.get('/vendor/dashboard', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (err, fvendor)=>{
		let vendor
		res.render('marketplace/vendor/dashboard', {title: 'vendor dashboard', vendor: fvendor })	
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
	
	
	
	var vendorEmail			=	{email};
	var vendorPhone			=   {phone};
	var vendorLocation		=	{country, address, city, state, zipcode};
	var contact				=	{email, phone, vendorLocation};
	var vendor				=	{vendorname, user_id};
	
	
	
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
					VendorContact.findByIdAndRemove(delVendor.contact_id, (contact_err, delContact)=>{
						if(delContact){
						VendorEmail.findByIdAndRemove(delContact.email_id, (email_err, delemail)=>{
							if(delemail){
								VendorPhone.findByIdAndRemove(delContact.phone_id, (phone_err, delphone)=>{
									if(delphone){
										VendorLocation.findByIdAndRemove(delContact.vendorlocation_id, (location_err, dellocation)=>{
											if(dellocation){
												
											}else{
												console.log('vendor location not found')
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