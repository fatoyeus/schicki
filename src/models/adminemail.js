var mongoose 	=	require('mongoose');


var adminemailSchema	=	new mongoose.Schema({
													email:	{ type: String, required: true, unique: true }
												});

module.exports	=	mongoose.model('adminemail', adminemailSchema );