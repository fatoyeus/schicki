let   express  		    =  		require('express'),
      router			=		express.Router();

const notification = [
							{
								code		:	1001,
								name		:	'welcome_message',
								category	:	'user',
								message		:	'Welcome to Schicki',
								link		:	'/'
							},
							{
								code		:	1002,
								name		:	'create_profile',
								category	:	'user',
								message		:	'Create a profile',
								link		:	'/user/profile/new'
							},
							{
								code		:	2001,
								name		:	'vendor_start_message',
								category	:	'vendor',
								message		:	'Become a vendor',
								link		:	'/vendor/enroll'
							},
							{
								code		:	2002,
								name		:	'vendor_createstore_message',
								category	:	'vendor',
								message		:	'Create a store',
								link		:	'/store/create'
							}
						]

module.exports = notification;