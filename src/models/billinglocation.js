var mongoose 	=	require('mongoose');


var billinglocationSchema	=	new mongoose.Schema({
													country :	String,
													address	:	String,
													city	:	String,
													state	:	String,
													zipcode	: 	String,
													});

module.exports	=	mongoose.model('billinglocation', billinglocationSchema );