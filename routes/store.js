var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	snippets		=		require('../public/lib/snippets.js'),
	title			=		'schicki';

function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname,action:'/login', title:'login'});
	}
	else if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	else if(!req.user.isProfiled){
		res.redirect('/');
	}
	else if(!req.user.isVendor){
		res.redirect('/');
	}
	else{
		next();
	}
}
function checkstore(req, res, next){
	
}
//assign user to store 
router.post('/store/:store_id/assignuser/:assigneduser', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (w_err, gvendor)=>{
		if(gvendor.stores.includes(req.params.store_id)){
															Store.findById(req.params.store_id, (au_err, gstore)=>{
																if(!gstore.users.includes(req.params.assigneduser)){
																									gstore.users.push(req.params.assigneduser);
																									gstore.save();
																									let opt = {path: "users", select: ['fname', 'lname', 'username'], model: "user"};
																									User.populate(gstore, opt, (bu_err, hstore)=>{
																										let snip = snippets;
																										snip.store = hstore;
																										let mn = res.render('forms/snippets/vendassocbtn', {snippets: snip});
																										res.send(mn);
																									});
																}else{
																		console.log('user already assigned');
																		res.sendStatus(403);
																	}
															});
		}else{
				console.log('store does not exist');
				res.redirect('/stores/view');
		}
	})
	
});
//remove user from store
router.post('/store/:store_id/removeuser/:removeduser', checkLogin, (req, res)=>{
	Vendor.findById(req.user.vendor_id, (w_err, gvendor)=>{
		if(gvendor.stores.includes(req.params.store_id)){
															Store.findById(req.params.store_id, (bu_err, istore)=>{
																if(istore.users.includes(req.params.removeduser)){
																	istore.users.forEach((l,m,n)=>{
																						if(req.params.removeduser.toString() === l.toString()){
																																				n.splice(m, 1);
																																			}
																										})
																				istore.save();
																				let opt = {path: "users", select: ['fname', 'lname', 'username'], model: "user"};
																									User.populate(istore, opt, (cu_err, jstore)=>{
																										let snip = snippets;
																										snip.store = jstore;
																										let mn = res.render('forms/snippets/vendassocbtn', {snippets: snip});
																										res.send(mn);
																									});
																}else{
																	console.log('user not assigned');
																	res.sendStatus(403);
																}
																		
														});
			
		}else{
			res.sendStatus(403);
			res.redirect('/stores/view');
		}
	})
	
});
//Create a Store
router.get('/store/create', checkLogin, (req, res)=>{
	Storecat.find({status: 222}, (err, categories)=>{
		var cat;
		res.render('marketplace/store/register', {title:'Create Store', cat: categories});
	});
});

router.post('/store/create', checkLogin, (req, res)=>{
	Store.create(req.body).then((nstore)=>{
											Vendor.findById(req.user.vendor_id, (err, fvendor)=>{
																				fvendor.stores.push(nstore._id);
																				fvendor.save();
																				});
										    nstore.vendor_id	=	req.user.vendor_id;
											nstore.save();
											res.redirect('/stores/view');
										}).catch((err)=>{
															console.log(err.message);
									});
	
							});

//Search store availability
router.get('/store/search/:id/check', checkLogin, (req, res)=>{
	Store.find({ storename : {$regex : `^${req.params.id}`, $options : 'i'}}, 'storename', (err, store)=>{
		console.log('store is: '+ store.length);
		if (store.length > 0){
			res.send(false);
		}else{
			res.send(true);
		}
	})
});

//show stores

router.get('/stores/view', checkLogin, (req, res)=>{
	var vendor,
		stores;
	Vendor.findById(req.user.vendor_id, (err, fv)=>{
		if(fv){
			vendor = fv;
				Store.find({ vendor_id: req.user.vendor_id },'_id storename status requestdate', (err, fs)=>{
					res.render('marketplace/store/dashboard', {stores: fs, title: vendor.vendorname + ' Stores'});
						});
				}
			});
	});
router.get('/stores/view/:store_id/detail', checkLogin, (req, res)=>{
	var store,
		users;
	
	Vendor.findById(req.user.vendor_id, (v_err, gv)=>{
		if(gv.stores.includes(req.params.store_id)){
			var opt = {path: "users", select: ['fname', 'lname', 'username'], model: "user"};
			User.populate(gv, opt, (p_err, pusers)=>{
				console.log(req.user);
				Store.findById(req.params.store_id, (err, fstore)=>{
															User.populate(fstore, opt, (s_err, suser)=>{
															if(err){ 
																res.redirect('/stores/view');
															}
															else if(fstore.vendor_id.toString !== req.user.vendor_id.toString || fstore.status === 'Blocked'){
																res.redirect('/stores/view');

															}else{
																res.render('marketplace/store/managestore', {store: suser, title: fstore.storename, users: pusers.users })
															}
															})
														});
			})
			
		}else{
			console.log('store does not exist');
			res.redirect('/stores/view')
		}
	});
	
});
module.exports	=		router;