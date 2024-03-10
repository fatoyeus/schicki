var mongoose		=		require('mongoose');

var storeSchema		=	new mongoose.Schema({
	storeimg			:	{	type	:	String},
	storename			:	{ 	type 	:	String, required : true, unique : true },
	description			:	String,
	category			: 	{ 	type 	:	String, required : true },
	vendor_id			:	{
							 	type 	:	mongoose.Schema.Types.ObjectId,
							 	ref  	:	'vendor'
							},
	status				:	{ 	type 	:	String, default : 'Awaiting Approval'},
	requestdate			:	{ 	type 	:	Date, default : Date.now() },
	approvedate			:	{ 	type 	:	Date },
	blockeddate			:	{ 	type 	:	Date },
	approvedby			:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'admin'
							},
	lastblockedby		:	{
							 	type 	: 	mongoose.Schema.Types.ObjectId,
							 	ref  	: 	'admin'
							},
	blockedtimes		:	{	type 	: 	Number, default : 0 },
	inventory			:	{
								type 	:	mongoose.Schema.Types.ObjectId,
								ref		:	'inventory'
							},
	owner				:	{
								type	:	mongoose.Schema.Types.ObjectId,
								ref		:	'user'
							},
	users				: 	[
								{
									type	:	mongoose.Schema.Types.ObjectId,
									ref		: 	'user'
								}
							]
	});
	

module.exports	=	mongoose.model('store', storeSchema );