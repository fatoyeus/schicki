var mongoose 		=	require('mongoose');


var productSchema	=	new mongoose.Schema({
											inventoryId		:	{
																	type	:	mongoose.Schema.Types.ObjectId,
																	ref		:	'inventory'
																},
											productname		:	String,
											description		:	String,
											stock			:	Number,
											productImage	:	String,
											sku				: 	String,
											promotion		:	{	type 	: Boolean, 
																 	default	: false },
											discount     	: 	{
																	type	: Number,
																	default	: null
																},
											price			:	Number,
																					});

module.exports	=	mongoose.model('product', productSchema );