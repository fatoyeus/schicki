var mongoose 		=	require('mongoose');


var notificationSchema	=	new mongoose.Schema({
													userId			:	{
																			type	:	mongoose.Schema.Types.ObjectId,
																			ref		:	'user'
																		},
													notifications	:	[
																			{
																				notif_id	:	String,
																				link		:	String,
																				readStatus	:	{ type	: Boolean, default : false },
																				timestamp	:	{ type	: Date }
																			}
																		],
													maxlength		:	{ 	type	: 	Number, default: 50 },
													unreadNot		:	{	type	:	Number, default: 0	}
												});

module.exports	=	mongoose.model('notification', notificationSchema );