var mongoose 	=	require('mongoose');


var orderSchema	=	new mongoose.Schema({
	orderDate		:	{ type: Date, default: Date.now },
	orderCart		:	string,
	invoiceNumber	:	string,
	location		:	{
							type : mongoose.Schema.Types.OjectId,
							ref	 : 'location'
						},
	user			:	{
							type : mongoose.Schema.Types.ObjectId,
							ref	 : 'user'
						},
	products		:	[
						 {
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'product'
						 }
						],
	status			:	string
	
});

module.exports	=	mongoose.model('order', orderSchema );