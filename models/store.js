var mongoose		=		require('mongoose');

var storeSchema		=	new mongoose.Schema({
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
							}
	});
	

module.exports	=	mongoose.model('store', storeSchema );