var mongoose 		=	require('mongoose');


var productSchema	=	new mongoose.Schema({
											productname		:	String,
											description		:	String,
											inventory		:	Number,
											productImage	:	String,
											sku				: 	String,
											vendorname		:	{	 
																	 type	:	mongoose.Schema.Types.ObjectId,
																	 ref	:   'vendor'	
																},
											Category		: 	{
																	 type : mongoose.Schema.Types.ObjectId,
																	 ref  : 'prodCat'
																},
											price			:	{
																	 type : mongoose.Schema.Types.ObjectId,
																	 ref  : 'price'
																}
																					});

module.exports	=	mongoose.model('product', productSchema );