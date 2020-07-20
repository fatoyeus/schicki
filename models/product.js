var mongoose 		=	require('mongoose');


var productSchema	=	new mongoose.Schema({
											productname		:	String,
											description		:	String,
											inventory		:	Number,
											productImage	:	String,
											sku				: 	String,
											vendorid		:	{	 
																	 type	:	mongoose.Schema.Types.ObjectId,
																	 ref	:   'vendor'	
																},
											Category		: 	{
																	 type : String,
																	 enum : '../templates/prodcat'
																},
											price			:	Number,
																					});

module.exports	=	mongoose.model('product', productSchema );