let express  		    =  		require('express'),
      app 	 		    =  		express(),
	  mongoose			=  		require('mongoose'),
	  request			=  		require('request'),
      bodyParser 		=  		require('body-parser'),
	  bcrypt			=		require('bcryptjs'),
	  helmet			=		require('helmet'),
	  methodOverride	= 		require('method-override'),
	  Admin				=		require('./models/admin'),
	  User				= 		require('./models/user'),
	  adminRoutes		=		require('./routes/admins'),
	  authRoutes		=		require('./routes/auth'),
	  productRoutes		=		require('./routes/products'),
	  userRoutes		=		require('./routes/users'),
	  emailRoutes		=		require('./routes/emails'),
	  phoneRoutes		=		require('./routes/phones'),
	  vendorRoutes		=		require('./routes/vendors'),
	  inventoryRoutes	=		require('./routes/inventory'),
	  indexRoutes		=		require('./routes/index'),
	  storeRoutes		=		require('./routes/store'),
	  notify			= 		require('./public/lib/notifications'),
	  port 				= 		process.env.PORT || 3000,
	  not_options		=		{
		  							setHeaders	:	(res, path, stat)=>{
										res.set({
													'Content-Type'	:	'text/event-stream',
													'Cache-Control'	:	'no-cache'
												});
									}
	 							 };
	  

const url 				= 		process.env.DB_URL || "mongodb://localhost/schickidb",
	  sessions			=		require('client-sessions'),
	  csrf				=		require('csurf');


app.use('/sc_static', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use('/notify', express.static('notifications', not_options));
//app.use(helmet());
app.use(sessions({
					cookieName	:	"schikiSession",
					secret		:	"ug70&&%$hdh3$@1d",
					duration	:	30 * 60 * 1000
				}));


//middleware to check session
app.use((req, res, next)=>{
	var loggedIn;
	if(req.schikiSession.userId||req.schikiSession.adminId){
		var loggedIn = (req.schikiSession.userId ? req.schikiSession.userId : req.schikiSession.adminId);
	}else{
		var loggedIn = 'not loggedIn';
	}
		switch(loggedIn){
			case 	req.schikiSession.userId : 
						console.log('using case of user');
						
						User.findById(req.schikiSession.userId, '-password -orders -birthday_id -contact_id ', (err, user)=>{
						if(err){
							res.locals.user = null;
							req.schikiSession.userId = null;
							return res.redirect('/');
							return next (err);
						}
						if(!user){
							req.schikiSession.userId = null;
							res.locals.user = null;
							return res.redirect('/');
							return next ();
						}
						User.populate(user,[{path:'notification_id', model:'notification'}], (n_err, nuser)=>{
									console.log(user);
									req.user		 = user;
									res.locals.user  = user;
									req.admin		 = null;
									res.locals.admin = null;
									next();
								})

						});
					
						break;
			case  	req.schikiSession.adminId 	: 
				 	console.log('using case of admin');
					
					
						Admin.findById(req.schikiSession.adminId, '-password', (err, admin)=>{
						if(err){
							res.locals.admin = null;
							req.schikiSession.adminId = null;
							return res.redirect('/admin/dashboard');
							return next (err);
						}
						if(!admin){
							res.locals.admin = null;
							req.schikiSession.adminId = null;
							return res.redirect('/admin/dashboard');
							return next ();
						}
						req.user		 = null;
						res.locals.user  = null;
						req.admin		 = admin;
						res.locals.admin = admin;
							
						next();

						});
					
						break;
			default  :  res.locals.user = null;
						res.locals.admin = null;
						return next();
		}
	
	
	
	
	
}); 
//middleware for notifications
app.use(notify);
//middleware for server-events

//app.disable('x-powered-by');

/*app.use('/admin', (req, res, next)=>{
					Admin.findById(req.schikiSession.adminId, '-password', (err, admin)=>{
						if(err){
							return next (err);
						}
						if(!admin)
							return next ();

						req.user		 = null;
						res.locals.user  = null;
						req.admin		 = admin;
						res.locals.admin = admin;
							
						next();

						});
});
app.use('/user', (req, res, next)=>{
			User.findById(req.schikiSession.userId, '-password', (err, user)=>{
						if(err){
							return next (err);
						}
						if(!user)
							return next ();


						req.user		 = user;
						res.locals.user  = user;
						req.admin		 = null;
						res.locals.admin = null;
						next();

						});
});
app.use((req, res, next)=>{
						res.locals.user = null;
						res.locals.admin = null;
						
						return next();
}); */



var csrfProtection = csrf({ 
							cookie: false
						 });

//Connect to the application database

mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
	console.log("DB Connected");
}).catch(err=>{
	console.log("Error:", err.message);
});

//middleware

//Routes

app.use(adminRoutes);
app.use(authRoutes);
app.use(emailRoutes);
app.use(phoneRoutes);
app.use(productRoutes);
app.use(storeRoutes);
app.use(userRoutes);
app.use(vendorRoutes);
app.use(indexRoutes);



app.listen(port, ()=>{
	if(process.env.PORT){
		console.log("server is running on port " + process.env.PORT)
	}else{
		console.log("Server is running on port 3000");
		}
	}
);
