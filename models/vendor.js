var mongoose 	=	require('mongoose');


var vendorSchema		=	new mongoose.Schema({
	vendorname			:	{ 	type 	: 	String, required : true, unique : true },
	user_id				:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'user'
							},
	level				:	{	type	:	String, required : true, unique : true },
	status				:	{ 	type 	: 	String, default : 'Awaiting Approval'},
	associate			:	{	type	:	Boolean, default: false},
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
	stores				:	[
								{
								type	:	mongoose.Schema.Types.ObjectId,
								ref		:	'store'
								}
							],
	users				:	[
								{
								type	:	mongoose.Schema.Types.ObjectId, 
								ref		:	'user',
								unique	:	true
								}
							],
	malls				:	[
								{
								type	:	mongoose.Schema.Types.ObjectId,
								ref		:	'mall'
								}
							],
	association_id		:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'association'
							}
				});

module.exports	=	mongoose.model('vendor', vendorSchema );