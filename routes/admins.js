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
	  createStore		= 		require('../APIs/schicki_storage/createstore'),		  
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
		}
		req.schikiSession.adminId = admin._id;
		req.schikiSession.userId  = null;	
		if(!req.body.lastChecked){
			res.redirect('/admin/dashboard');
		}else{
			res.redirect(req.body.lastChecked);
		};
});
		
	});

//Create Admins
//Get form
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


//Vendor access management
 router.get('/admin/c10/all/vendor/accessmanagement', (req, res)=>{
	 Vendor.find({},'_id vendorname status requestdate blockeddate blockedby approvedby blockedtimes',(err, unapprovedVendors)=>{
		 var vendors;
		 res.render('administrator/management/vendoraccess', {vendors: unapprovedVendors, title:'vendor access'})
	 });
 });
//Approve vendors-c10
router.post('/admin/c10/vendor/:id/approve',(req, res)=>{
	Vendor.findByIdAndUpdate(req.params.id, {status: 'Active', approvedate: Date.now(), approvedby: req.admin.username},(err, vendor)=>{
		if (err){
			console.log(err);
			res.send('Status: Awaiting Approval');
			}else{
			console.log(vendor);
			res.send('Status: Active');
			}
	});
});
//Block vendors
router.post('/admin/c10/vendor/:id/block',(req, res)=>{
	Vendor.findById(req.params.id, (f_err, fvendor)=>{
		if(fvendor){
			Vendor.findByIdAndUpdate(req.params.id, {status: 'Blocked', blockeddate: Date.now(), blockedby: req.admin.username, blockedtimes: ++fvendor.blockedtimes},(err, vendor)=>{
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
	Vendor.findByIdAndUpdate(req.params.id, {status: 'Active', blockeddate: null, blockedby: null },(err, vendor)=>{
		if (err){
			console.log(err);
			res.redirect('/admin/c10/all/vendor/accessmanagement');
			}else{
			console.log(vendor);
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