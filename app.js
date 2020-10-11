let express  		    =  		require('express'),
      app 	 		    =  		express(),
	  mongoose			=  		require('mongoose'),
	  request			=  		require('request'),
      bodyParser 		=  		require('body-parser'),
	  bcrypt			=		require('bcryptjs'),
	  helmet			=		require('helmet'),
	  Admin				=		require('./models/admin'),
	  User				= 		require('./models/user'),
	  adminRoutes		=		require('./routes/admins'),
	  authRoutes		=		require('./routes/auth'),
	  productRoutes		=		require('./routes/products'),
	  userRoutes		=		require('./routes/users'),
	  vendorRoutes		=		require('./routes/vendors'),
	  methodOverride	= 		require("method-override"),
	  indexRoutes		=		require('./routes/index'),
	  storeRoutes		=		require('./routes/store'),
	  port 				= 		process.env.PORT || 3000;
	  

const url 				= 		"mongodb://localhost/schickidb",
	  sessions			=		require('client-sessions'),
	  csrf				=		require('csurf');


app.use('/sc_static', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

app.use(sessions({
					cookieName	:	"schikiSession",
					secret		:	"ug70&&%$hdh3$@1d",
					duration	:	30 * 60 * 1000
				}));


//middleware to check session
app.use((req, res, next)=>{
	var loggedIn;
	if(req.schikiSession.userId||req.schikiSession.adminId){
		var loggedIn = (req.schikiSession.userId ? req.schikiSession.userId : req.schikiSession.adminId)
		console.log(loggedIn);
	}else{
		var loggedIn = 'not loggedIn';
	}
	console.log(loggedIn);
		switch(loggedIn){
			case 	req.schikiSession.userId : 
						console.log('using case of user');
						
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
					
						break;
			case  	req.schikiSession.adminId 	: 
				 	console.log('using case of admin');
					
					
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
					
						break;
			default  :  res.locals.user = null;
						res.locals.admin = null;
						return next();
		}
	
	
	
	
	
}); 

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
