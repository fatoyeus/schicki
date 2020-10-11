var mongoose 		=	require('mongoose');


var productSchema	=	new mongoose.Schema({
											productname		:	String,
											description		:	String,
											stock			:	Number,
											productImage	:	String,
											sku				: 	String,
											promotion		:	{	 type 	: Boolean, default	: false },
											vendorid		:	{	 
																	 type	:	mongoose.Schema.Types.ObjectId,
																	 ref	:   'vendor'	
																},
											price			:	Number,
																					});

module.exports	=	mongoose.model('product', productSchema );