var mongoose 	=	require('mongoose');


var vendoremailSchema	=	new mongoose.Schema({
	email:	{ type: String, required: true, unique: true }
});

module.exports	=	mongoose.model('vendoremail', vendoremailSchema );