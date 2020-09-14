var mongoose 	=	require('mongoose');


var vendorSchema		=	new mongoose.Schema({
	vendorname			:	{ 	type 	: 	String, required : true, unique : true },
	user_id				:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'user'
							},
	status				:	{ 	type 	: 	String, default : 'Awaiting Approval'},
	requestdate			:	{ 	type 	: 	Date, default : Date.now() },
	approvedate			:	{ 	type 	: 	Date },
	blockeddate			:	{ 	type 	: 	Date },
	approvedby			:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'admin'
							},
	blockedby			:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'admin'
							},
	unblockedby			:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'admin'
							},
	blockedtimes		:	{	type 	: 	Number, default : 0 },
	contact_id			: 	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'vendorcontact'
							},
	billingAddress_id	: 	{
							 	type 	:	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'billinglocation'
							},
	stores				:	{
								type	:	mongoose.Schema.Types.Array,
								ref		:	'store'
							}
				});

module.exports	=	mongoose.model('vendor', vendorSchema );