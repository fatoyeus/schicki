var mongoose 	=	require('mongoose');


var prodCatSchema	=	new mongoose.Schema({
	type :	string
});

module.exports	=	mongoose.model('prodCat', prodCatSchema );