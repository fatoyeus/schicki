var mongoose 	=	require('mongoose');


var locationSchema	=	new mongoose.Schema({
	country :	String,
	address	:	String,
	city	:	String,
	state	:	String,
	zipcode	: 	String,
	long	:	Number,
	lat		:	Number
});

module.exports	=	mongoose.model('location', locationSchema );