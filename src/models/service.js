var mongoose 		=	require('mongoose');


var serviceSchema	=	new mongoose.Schema({
											servicename		:	String,
											description		:	String,
											serviceImage	:	String,
											sku				: 	String,
											vendorid		:	{	 
																	 type	:	mongoose.Schema.Types.ObjectId,
																	 ref	:   'vendor'	
																},
											Category		: 	{
																	 type : String,
																	 enum : '../templates/servcat'
																},
											price			:	Number,
																					});

module.exports	=	mongoose.model('product', productSchema );