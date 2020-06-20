var mongoose 	=	require('mongoose');


var vendorphoneSchema	=	new mongoose.Schema({
	phone :	String
});

module.exports	=	mongoose.model('vendorphone', vendorphoneSchema );