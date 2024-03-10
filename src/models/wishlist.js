var mongoose 	=	require('mongoose');


var wishlistSchema	=	new mongoose.Schema({
	product		:	string,
	users		:	string		
});

module.exports	=	mongoose.model('wishlist', wishlistSchema );