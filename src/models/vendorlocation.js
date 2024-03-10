	var mongoose 	=	require('mongoose');


var vendorlocationSchema	=	new mongoose.Schema({
													country 				:	String,
													address					:	String,
													city					:	String,
													state					:	String,
													zipcode					: 	String,
													long					:	Number,
													lat						:	Number
													});

module.exports	=	mongoose.model('vendorlocation', vendorlocationSchema );