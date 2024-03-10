let   express  		    =  		require('express'),
      router			=		express.Router(),
	  bcrypt			=		require('bcryptjs'),
	  Admin				=		require('../models/admin'),
	  AdminEmail		=		require('../models/adminemail'),
  	  User				= 		require('../models/user'),
	  Email 			=		require('../models/email'),
	  Phone				=		require('../models/phone'),
	  Birthday 			=		require('../models/birthday'),
	  Location 			=		require('../models/location'),
	  Contact 			= 		require('../models/contact'),
	  Vendor 			=		require('../models/vendor'),
	  VendorContact		=		require('../models/vendorcontact'),
	  VendorEmail   	=		require('../models/vendoremail'),
	  VendorPhone		=		require('../models/vendorphone'),
	  VendorLocation	=		require('../models/vendorlocation'),
	  Store				= 		require('../models/store'),
	  Storecat			=		require('../models/storecat'),
	  Notification		= 		require('../models/notification'),	  
	  title				=		'schicki',
	  lastChecked,
	  action;

const authorization		=  		require('../templates/authorization');



function checkLogin(req, res, next){
						var lastChecked;
						if(req.user){
							req.schikiSession.userId = null; 
						}
						if( req.user && req._parsedUrl.pathname === '/admin/**1*5*2/login' ){
							req.schikiSession.userId = null; 
							return res.redirect('/');
						}
						if(!req.admin){
							return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname, title:'admin login', action: '/admin/login'});
						}
						next();
}
function prevAdminRelogin(req, res, next){
	if( req.user && req._parsedUrl.pathname === '/admin/login' ){
		req.schikiSession.userId = null; 
		return res.redirect('/');
	}if(req.admin && req._parsedUrl.pathname === '/admin/login'){
		 return res.redirect('/');
	}
	next();
}
function levelcheck(n){
	return function(req, res, next){
		if (!(req.admin.priviledge >= n)){
		return res.render('forbidden', {title : 'Forbidden'})
					}
		next();
		}
	}
authorization.forEach((auth)=>{
router.use(`/admin/c${auth.priviledge}`, checkLogin, levelcheck(auth.priviledge));
});

//Admin login
router.get('/admin/**1*5*2/login', prevAdminRelogin, (req, res, next)=>{ 
	res.render('forms/authentication/login', {lastChecked:null, action: '/admin/login', title:'admin login'});
});
router.post('/admin/login', (req, res)=>{
	Admin.findOne({username: req.body.username}, (err, admin)=>{
			if( !admin || !bcrypt.compareSync(req.body.password, admin.password)){
				var error;
				console.log(err);
				return res.render('forms/authentication/login', {
					error : 'Incorrect email / password.', lastChecked: null, action: '/admin/login', title:'admin login'

				}
								 );
			}else{
					if(!admin.notification_id){
							Notification.create({userId	:	admin._id}).then((adminN)=>{
																						admin.notification_id = adminN._id;
																						adminN.save();
																						admin.save();
							})
						}else{
					Notification.findById(admin.notification_id , (d_err, notf)=>{
						if(!notf){
									Notification.create({userId	:	admin._id}).then((adminN)=>{
																						admin.notification_id = adminN._id;
																											adminN.save();
																											admin.save();
									})
						}
						
					})
				}
					req.schikiSession.adminId = admin._id;
					req.schikiSession.userId  = null;	
					if(!req.body.lastChecked){
						res.redirect('/admin/dashboard');
					}else{
						res.redirect(req.body.lastChecked);
					};
				}
		
		});
		
	});

//Vendor access management
 router.get('/admin/c10/all/vendor/accessmanagement', (req, res)=>{
	 Vendor.find({},'_id vendorname status requestdate',(err, unapprovedVendors)=>{
		 var vendors;
		 res.render('administrator/management/vendoraccess', {vendors: unapprovedVendors, title:'vendor access'})
	 });
 });
//Approve vendors-c10
router.post('/admin/c10/vendor/:id/approve',(req, res)=>{
	Vendor.findByIdAndUpdate(req.params.id, {status: 'Active', approvedate: Date.now(), approvedby: req.admin._id},(err, vendor)=>{
		if (err){
				console.log(err);
				res.send('Status: Awaiting Approval');
				}else{
						User.findByIdAndUpdate(vendor.user_id, { isVendor : true }, (err, user)=>{
							if(err){
									console.log(err.message);
									}	
							   else{
								    req.notify(user.notification_id, 2001, 2002);
									res.send('Status: Active');
									}
								});
							}
						});
					});
//Block vendors
router.post('/admin/c10/vendor/:id/block',(req, res)=>{
	Vendor.findById(req.params.id, (f_err, fvendor)=>{
		if(fvendor){
			Vendor.findByIdAndUpdate(req.params.id, {status: 'Blocked', blockeddate: Date.now(), blockedby: req.admin._id, blockedtimes: ++fvendor.blockedtimes},(err, vendor)=>{
		if (err){
			console.log(err);
			res.redirect('/admin/c10/all/vendor/accessmanagement');
			}else{
			console.log(vendor);
			res.send('Status: Blocked');
			}
	});
		}
	})
	
});
//Unblock vendors
router.post('/admin/c10/vendor/:id/unblock',(req, res)=>{
	Vendor.findByIdAndUpdate(req.params.id, {status: 'Active', unblockedby: req.admin._id , blockeddate: null, blockedby: null },(err, vendor)=>{
		if (err){
			console.log(err);
			res.redirect('/admin/c10/all/vendor/accessmanagement');
			}else{
			console.log(vendor);
			res.send('Status: Active');
			}
	});
});
//Create Admins
router.get('/admin/c14/new/profile', (req, res)=>{
	res.render('administrator/admins/new', {title: 'create admin'});
			});

//Registering Admin
router.post('/admin/c14/new/profile', (req, res)=>{
	
	let password = bcrypt.hashSync(req.body.password, 16);
	
	req.body.cpassword = undefined;
	
	
	let fname 	 	= 	req.body.fname,
		lname		=	req.body.lname,
		username	=	req.body.username,
		email		=	req.body.email,
	    admin		=	{fname, lname, username, password},
		adminemail	= 	{email};
		 
	Admin.create(admin).then((nadmin)=>{
		AdminEmail.create(adminemail).then((nemail)=>{
									nadmin.email_id = nemail._id;
									nadmin.save();
		}).catch((err)=>{
				console.log(err.message);
		});
		
	}).catch();
	
	res.redirect('/admin/new/profile');
			});
//Store access management
 router.get('/admin/c8/all/store/accessmanagement', (req, res)=>{
	 Store.find({},'_id storename status requestdate',(err, unapprovedstores)=>{
		 var stores;
		 res.render('administrator/management/storeaccess', {stores: unapprovedstores, title:'store access'});
	 });
 });

//Manage store category
router.get('/admin/c8/store/category', (req, res)=>{
 Storecat.find({}, (err, cat)=>{
	 		var categories;
	 		res.render('administrator/management/storecategory', {categories: cat, title:'store category'});
	 });
});
router.post('/admin/c8/store/category', (req, res)=>{
	
	Storecat.create({name : req.body.categoryname}).then((ncat)=>{
		
		res.send(`${ncat._id}`);
	}).catch((err)=>{
		if (err){
				res.send(444);
		}
	})
})
router.post('/admin/c8/store/category/activate', (req, res)=>{
	Storecat.findByIdAndUpdate(req.body.selectedcat, {status: 222}, (err, cat)=>{
		console.log(cat);
		res.send(cat._id);
	})
})
router.post('/admin/c8/store/category/deactivate', (req, res)=>{
	
	Storecat.findByIdAndUpdate(req.body.selectedcat, {status: 444}, (err, cat)=>{
		console.log(cat);
		res.send(cat._id);
	})
})
//Approve stores-c8
router.post('/admin/c8/store/:id/approve',(req, res)=>{
	Store.findByIdAndUpdate(req.params.id, {status: 'Active', approvedate: Date.now(), approvedby: req.admin._id},(err, store)=>{
		if (err){
			console.log(err);
			res.send('Status: Awaiting Approval');
			}else{
			console.log(store);
			res.send('Status: Active');
			}
	});
});
//Block stores
router.post('/admin/c8/store/:id/block',(req, res)=>{
	Store.findById(req.params.id, (f_err, fstore)=>{
		if(fstore){
			Store.findByIdAndUpdate(req.params.id, {status: 'Blocked', blockeddate: Date.now(), blockedby: req.admin._id, blockedtimes: ++fstore.blockedtimes},(err, store)=>{
		if (err){
			console.log(err);
			res.redirect('/admin/c10/all/store/accessmanagement');
			}else{
			console.log(store);
			res.send('Status: Blocked');
			}
	});
		}
	})
	
});
//Unblock stores
router.post('/admin/c8/store/:id/unblock',(req, res)=>{
	Store.findByIdAndUpdate(req.params.id, {status: 'Active', unblockedby: req.admin._id , blockeddate: null, blockedby: null },(err, store)=>{
		if (err){
			console.log(err);
			res.redirect('/admin/c10/all/store/accessmanagement');
			}else{
			console.log(store);
			res.send('Status: Active');
			}
	});
});

//admin dashboard
router.get('/admin/dashboard', checkLogin, (req, res)=>{
	var dashboard;
	res.render('administrator/admins/dashboard', { title : 'Admin Dashboard', dashboard : authorization});
});

router.get('/admin/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});

module.exports	=		router;