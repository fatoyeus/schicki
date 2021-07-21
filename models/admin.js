var mongoose 	=	require('mongoose');


var adminSchema	=	new mongoose.Schema({
											fname				:	String,
											lname				:	String,
											priviledge			: 	{ type: Number, min : 1, max : 15, default: 1},
											username			:	{ type: String, required	: 	true, unique: true },
											password			:	{ type: String, required	: 	true },
											email_id			:	{
																	 	type :	mongoose.Schema.Types.ObjectId,
																	 	ref  : 'adminemail'
																	},
											status				:	{ type:	Number, min: 0, max: 5, required :	true, default: 0},
											created				:   { type: Date,	default: Date.now() },
											notification_id		:	{ 
																		type :	mongoose.Schema.Types.ObjectId,
																		ref	 :	'notification'
																	},
											
										});

adminSchema.virtual('fullName').get(function () {
	  return this.fname + ' ' + this.lname;
	});
module.exports	=	mongoose.model('admin', adminSchema );