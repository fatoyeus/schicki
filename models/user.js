var mongoose 	=	require('mongoose');


var userSchema	=	new mongoose.Schema({
	
	fname				:	String,
	lname				:	String,
	sex					:	String,
	permissions			: 	{ type: String, default 	:	'user'},
	username			:	{ type: String, required	: 	true, unique: true },
	password			:	{ type: String, required	: 	true },
	isVendor			:	{ type: Boolean, default	:   false},
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
							 order_id:	{
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
	billingAddress_id	: 	{
							type : mongoose.Schema.Types.ObjectId,
							ref  : 'billinglocation'
							}
										});

userSchema.virtual('fullName').get(function () {
	  return this.fname + ' ' + this.lname;
	});
module.exports	=	mongoose.model('user', userSchema );