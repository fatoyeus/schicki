var mongoose 	=	require('mongoose');


var phoneSchema	=	new mongoose.Schema({
	phone :	String
});

module.exports	=	mongoose.model('phone', phoneSchema );