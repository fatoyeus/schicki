var express			=		require('express'),
	router			=		express.Router(),
	AWS				=		require('../lib/API/AWS/schicki_aws'),
	Product			=		require('../models/product'),
	Store			=		require('../models/store'),
	Storecat		=		require('../models/storecat'),
	Inventory 		=		require('../models/inventory'),
 	Vendor 			=		require('../models/vendor');

const multer 		= 		require('multer'),
	  storage		=		multer.memoryStorage(),
	  upload 		= 		multer({ storage: storage });


var s3 = new AWS.S3();



function checkLogin(req, res, next){
	var lastChecked;
	if(!req.user){
		return res.render('forms/authentication/login', {lastChecked: req._parsedUrl.pathname, title:'login'});
	}
	if( req.user && req._parsedUrl.pathname === '/login' ){
		return res.redirect('/');
	}
	next();
}

//Product routes 
//edit an item
router.get('/products/:productId/edititem', checkLogin, (req, res)=>{
																	  Product.findById(req.params.productId, (eerr, efprod)=>{
																		  if(eerr){
																			  
																		  }else{
																			  res.render('marketplace/products/edititem', {product: efprod})
																		  }
																	  })
});
router.post('/products/:productId/edititem/image', checkLogin, upload.single('productimg'), (req, res)=>{
						Product.findById(req.params.productId, (derr, dfprod)=>{
							if(derr){
														
									}else{
										  console.log(dfprod);
											Inventory.findById(dfprod.inventoryId, (ferr,finventory)=>{
												if(ferr){
													console.log(ferr.message)
												}else{
													console.log(finventory);
												var ckey 	= `products/${finventory.storeId}/${finventory._id}/${req.file.originalname}`,
													params	=	{
																	Bucket	:	"schicki-dev-bucket",
																	ACL		: 	"public-read",
																	Body	:	req.file.buffer,
																	Key		:   ckey
																}
								s3.putObject(params, (err,data)=>{
																if(err){
																							
																		}else{
							//	var productImage	=	`https://schicki-dev-bucket.s3.eu-west-3.amazonaws.com/products/${finventory.storeId}/${finventory._id}/${req.file.originalname}`
								dfprod.otherImages.push(req.file.originalname);
								dfprod.save();
								res.render('marketplace/products/modal', { modal : "Add" });
																				}
																	})
											}
																										})
								
								
											}
																			})
																									})
//get product details
router.get('/products/:productId/itemdetails', checkLogin, (req, res)=>{
																Product.findById(req.params.productId, (err, fprod)=>{
																	if(err){

																			}else{
																					res.render('marketplace/products/itemdetails', { product: fprod });
																					}
																															})

															});
//create a product
router.post('/:vendor_id/products/register', checkLogin, (req, res)=>{
	console.log(req.body);
	 res.rediret('/');
});
//update a product
router.post('/products/:productId/updateitem', checkLogin, upload.none(), (req, res)=>{
	console.log('I was called');
	console.log(req.body);
	if(!req.body.promotion){
		req.body.promotion = false;
		req.body.discount = 0;
	};
	Product.findByIdAndUpdate(req.params.productId, req.body, {returnDocument: "after"}, (err, updprod)=>{
																			if(err){
																					res.sendStatus(404);
																			}else{
																					res.sendStatus(200);
																			}
	});
})

//delete item
router.delete('/products/:productId/delete', checkLogin, (req, res)=>{
																	 	Product.findByIdAndRemove(req.params.productId, (err, gprod)=>{
																		  if(gprod){
																			  Inventory.findById(gprod.inventoryId, (ferr, finv)=>{
																				  if(ferr){
																					  
																						  }else{
																									finv.stocklist.splice(finv.stocklist.indexOf(req.params.productId), 1);
																							  		for(var j = 0; j < gprod.otherImages.length; j++){
																									var dkey = `products/${finv.storeId}/${finv._id}/${gprod.otherImages[j]}`;
																																			console.log(typeof dkey);
																																		  var params = {
																																						Bucket	: 	"schicki-dev-bucket",
																																						Key 	:	dkey	
																																		  };
																																		  s3.deleteObject(params, (gerr, data)=>{
																																			  if(gerr){
																																						console.log(gerr, gerr.stack);
																																			  }else{
																																						console.log(data);
																																			  }
																																		  })
																																	  					}
																							  		res.render('marketplace/products/modal', { modal : "Delete" });
																						  }
																				  
																			  })
																		  	}
																		});
																	});
module.exports	=		router;