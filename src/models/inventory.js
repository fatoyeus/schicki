var mongoose			=		require('mongoose');

var inventorySchema		=		new mongoose.Schema({
													storeId		:		{ 	type 		:	mongoose.Schema.Types.ObjectId,
																			ref			:	'store',
																			required	:	true 
																		},
													stocklist	:		[
																			{
																				type		:	mongoose.Schema.Types.ObjectId,
																				ref			:	'product'
																			}
																		]
													});	

module.exports 			=		mongoose.model('inventory', inventorySchema);