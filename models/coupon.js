var mongoose 	=	require('mongoose');


var couponSchema	=	new mongoose.Schema({
	coupon :	string
});

module.exports	=	mongoose.model('coupon', couponSchema );