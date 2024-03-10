var mongoose 	=	require('mongoose');


var cartSchema	=	new mongoose.Schema({
	products :	[{
					type : mongoose.Schema.Types.ObjectId,
					ref  : 'product'
				}]
});

module.exports	=	mongoose.model('cart', cartSchema );