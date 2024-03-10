var mongoose 	=	require('mongoose');

 
var vendorcontactSchema	=	new mongoose.Schema({
	vendor_id			:	{
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'vendor'
							},
	email_id			:	{
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'vendoremail'
							},
	phone_id			:   {
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'vendorphone'
							},
	vendorlocation_id	:   {
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'vendorlocation'
							}
												});

module.exports	=	mongoose.model('vendorcontact', vendorcontactSchema );