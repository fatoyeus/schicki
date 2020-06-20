var mongoose 	=	require('mongoose');


var contactSchema	=	new mongoose.Schema({
	userEmail_id		:	{
						type : mongoose.Schema.Types.ObjectId,
						ref  : 'email'
					},
	
	userPhone_id		:   {
						type : mongoose.Schema.Types.ObjectId,
						ref  : 'phone'
					},
	
	userLocation_id	:   {
						type : mongoose.Schema.Types.ObjectId,
						ref  : 'location'
					}
});

module.exports	=	mongoose.model('contact', contactSchema );