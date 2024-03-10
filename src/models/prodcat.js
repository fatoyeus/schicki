var mongoose 	=	require('mongoose');


var prodcatSchema	=	new mongoose.Schema({
	type :	string
});

module.exports	=	mongoose.model('prodcat', prodcatSchema );