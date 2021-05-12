var mongoose 		=	require('mongoose');


var notificationSchema	=	new mongoose.Schema({
													userId			:	{
																			type	:	mongoose.Schema.Types.ObjectId,
																			ref		:	'user'
																		},
													notifications	:	[
																			{
																				notif_id	:	String,
																				readStatus	:	{ type	: Boolean, default : false }
																			}
																		],
													maxlength		:	{ type	: Number, default: 50 }
												});

module.exports	=	mongoose.model('notification', notificationSchema );