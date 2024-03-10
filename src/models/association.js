var mongoose 	=	require('mongoose');
var level		= 	require('../templates/vendorlevel');

var vendorSchema		=	new mongoose.Schema({
												vendorname			:	{ 	type 	: 	String, required : true, unique : true },
												vendor_id			:	{
																				type 	: 	mongoose.Schema.Types.ObjectId,
																				ref  	: 	'vendor'
																			},
												users				:	[ 
																		 	{
																			id: {
																					type	:	mongoose.Schema.Types.ObjectId,
																					ref		:	'user'
																					},
																		    username	:	String,
																			daterequested:	{ 	type 	: 	Date, 	default : Date.now() },
																			status	:	{ 	type	: 	Number, default	:	100101}
																			}
																		
																		]
												});

module.exports	=	mongoose.model('association', vendorSchema );