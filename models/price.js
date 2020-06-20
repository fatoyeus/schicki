var mongoose 	=	require('mongoose');


var priceSchema	=	new mongoose.Schema({
	price	:	string
});

module.exports	=	mongoose.model('price', priceSchema );