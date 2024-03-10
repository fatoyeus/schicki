   var mongoose 	=	require('mongoose');


var userSchema	=	new mongoose.Schema({
	
	fname				:	String,
	lname				:	String,
	sex					:	String,
	permissions			: 	{ type: String, default 	:	'user'},
	username			:	{ type: String, required	: 	true, unique: true },
	password			:	{ type: String, required	: 	true },
	isVendor			:	{ type: Boolean, default	:   false},
	isVendorUser		:	{ type: Boolean, default	:   false},
	vendorAssoc			:	{ type: Number, default		:	100100}, //100100 not requested, 100101 requested, 100102 granted, 100103 accepted, 100104 admitted
	assocVendor			:	{
								type: mongoose.Schema.Types.ObjectId,
								ref : 'vendor'
							},
	persona				:	{ type: String, default		:	'p10001001'},
	vendor_id			:	{
							 	type: mongoose.Schema.Types.ObjectId,
								ref : 'vendor'
							},
	isProfiled			:	{ type: Boolean, default	:	false},
	cart_id				:	{
								type :	mongoose.Schema.Types.ObjectId,
								ref  : 	'cart'
							},
	orders				:	[
								 {
									order_id	:	{
														type :	mongoose.Schema.Types.ObjectId,
														ref  :	'order'
													}
								 }
							],
											
	birthday_id			: 	{
							type :	mongoose.Schema.Types.ObjectId,
							ref  :  'birthday'
							},
	wishlist_id			: 	{
							type :	mongoose.Schema.Types.ObjectId,
							ref  :	'wishlist'
							},
	contact_id			:	{
							type :	mongoose.Schema.Types.ObjectId,
							ref  :  'contact'
							},
	notification_id		:	{ 
							type :	mongoose.Schema.Types.ObjectId,
							ref	 :	'notification'
							},
	billingAddress_id	: 	{
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'billinglocation'
							}
										});

userSchema.virtual('fullName').get(function () {
	  return this.fname + ' ' + this.lname;
	});
module.exports	=	mongoose.model('user', userSchema );