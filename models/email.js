var mongoose 	=	require('mongoose');


var emailSchema	=	new mongoose.Schema({
											email:	{ type: String, required: true, unique: true }
										});

module.exports	=	mongoose.model('email', emailSchema );