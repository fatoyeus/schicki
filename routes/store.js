var express			=		require('express');
var router			=		express.Router();

var	User			= 		require('../models/user'),
	Vendor 			=		require('../models/vendor'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	Inventory 		=		require('../models/inventory'),
	snippets		=		require('../lib/utilities/snippets.js'),
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
	else if(!(req.user.isVendor||req.user.isVendorUser)){
		res.redirect('/');
	}
	else if(req.user.isVendorUser && !req._parsedUrl.pathname.startsWith('/stores/view')){
		res.redirect('/stores/view');
	}
	else{
		next();
	}
}
function checkStoreOwner(req, res, next){
	Vendor.findById(req.user.vendor_id, (err, gvendor)=>{
			if(gvendor.stores.includes(req.params.store_id) && req.user.isVendor){
				next();
			}else{
				res.redirect('/stores/view');
			}
	})
}
function checkVendor(req, res,next){
	if(!req.user.isVendor){
		res.redirect('/stores/view');
	}else{
		next();
	}
}
//assign user to store 
router.post('/store/:store_id/assignuser/:assigneduser', checkLogin, checkStoreOwner, (req, res)=>{
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
	});
//create inventory
router.post('/store/:store_id/createInventory', checkLogin, checkStoreOwner, (req, res)=>{
	Store.findById(req.params.store_id, (k_err, kstore)=>{
		if(kstore.users.includes(req.user._id)){
												Inventory.create({storeId : req.params.store_id}).then((inventory)=>{
																														kstore.inventory = inventory._id
																														kstore.save();
																													 //  	res.redirect(`/inventory/${inventory._id}/management`);
																													})
												}
	})
});
//remove user from store
router.post('/store/:store_id/removeuser/:removeduser', checkLogin, checkStoreOwner, (req, res)=>{
																Store.findById(req.params.store_id, (bu_err, istore)=>{
																if(istore.users.includes(req.params.removeduser)){
																				istore.users.pull(req.params.removeduser);
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
			
		
	
	
});
//Create a Store
router.get('/store/create', checkLogin, checkVendor, (req, res)=>{
	Storecat.find({status: 222}, (err, categories)=>{
		var cat;
		res.render('marketplace/store/register', {title:'Create Store', cat: categories});
	});
});

router.post('/store/create', checkLogin, checkVendor, (req, res)=>{
	Store.create(req.body).then((nstore)=>{
											Vendor.findById(req.user.vendor_id, (err, fvendor)=>{
																				fvendor.stores.push(nstore._id);
																				fvendor.save();
																				});
										    nstore.vendor_id	=	req.user.vendor_id;
											nstore.users.push(req.user._id);
											nstore.owner = req.user._id;
											nstore.save();
											res.redirect('/stores/view');
										}).catch((err)=>{
															console.log(err.message);
									});
	
							});

//Search store availability
router.get('/store/search/:id/check', checkLogin, checkVendor, (req, res)=>{
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
	Vendor.findById(req.user.vendor_id, (err, fv)=>{
		if(fv){
				Store.find({ vendor_id: req.user.vendor_id }).
						select('_id storename status requestdate users').
						elemMatch('users', {$eq: req.user._id}).
						exec((err, fs)=>{
											console.log(fs);
											res.render('marketplace/store/dashboard', {stores: fs, title: `${fv.vendorname} Stores`})
										})
				}
			});
	});
router.get('/stores/view/:store_id/detail', checkLogin, (req, res)=>{
	var store,
		users;
	
	Vendor.findById(req.user.vendor_id, (v_err, gv)=>{
		if(gv.stores.includes(req.params.store_id)){
			var opt = {path: "users", select: ['fname', 'lname', 'username', '_id'], model: "user"};
			User.populate(gv, opt, (p_err, pusers)=>{
				console.log(req.user);
				Store.findById(req.params.store_id, (err, fstore)=>{
														if(req.user.isVendor || (req.user.isVendorUser && fstore.users.includes(req.user._id))){
															User.populate(fstore, opt, (s_err, suser)=>{
															if(err){ 
																res.redirect('/stores/view');
															}
															else if(fstore.vendor_id.toString !== req.user.vendor_id.toString || fstore.status === 'Blocked'){
																res.redirect('/stores/view');

															}else if(req.user.isVendorUser){
																res.render('marketplace/store/managestore', {store: suser, title: fstore.storename, users: null })
															
															}else{
																res.render('marketplace/store/managestore', {store: suser, title: fstore.storename, users: pusers.users })
															}
															})
														}else{
															res.redirect('/stores/view');
														}
														});
			})
			
		}else{
			console.log('store does not exist');
			res.redirect('/stores/view')
		}
	});
	
});
//delete store
router.delete('/store/:store_id', checkLogin, checkStoreOwner, (req, res)=>{
			Store.findById(req.params.store_id).
					 select('_id status users').
					 exec((d_err, dstore )=>{
											if (dstore.users.length > 0){
												console.log('remove assigned user first');
												res.redirect(`/stores/view/${req.params.store_id}/detail`);
											}else if(dstore.inventory){
												console.log('delete inventory before deleting store');
												res.redirect(`/stores/view/${req.params.store_id}/detail`);
											}else if(dstore.owner !== req.user._id){
												console.log('Store can only be deleted by owner');
												res.redirect(`/stores/view/${req.params.store_id}/detail`);
											}else{
												Store.findByIdAndRemove(req.params.store_id, (e_err, estore)=>{
													if(estore){
														Vendor.findById(estore.vendor_id, (f_err, fvendor)=>{
															fvendor.stores.pull(estore._id);
															fvendor.save((g_err, savedVendor)=>{
															console.log(savedVendor);
															res.redirect('/stores/view');
															})
														})
													}else{
														console.log('unable to delete store')
														res.redirect(`/stores/view/${req.params.store_id}/detail`);
													}
												})
													 }
			});
})
//default route
router.get('/store/*', checkLogin, (req, res)=>{
	var path;
	res.render('pnf', {title: 'page not found', path: req._parsedUrl.pathname });
});	
module.exports	=		router;