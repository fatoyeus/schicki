let   express  		    =  		require('express'),
      router			=		express.Router();

const notification = [
							{
								code		:	1001,
								name		:	'welcome_message',
								category	:	'user',
								message		:	'Welcome to Schicki',
								link		:	''
							},
							{
								code		:	1002,
								name		:	'create_profile',
								category	:	'user',
								message		:	'Create a profile',
								link		:	'user/profile/new'
							},
							{
								code		:	1003,
								name		:	'vendor_start_message',
								category	:	'user',
								message		:	'Become a vendor',
								link		:	'vendor/enroll'
							},
							{
								code		:	1013,
								name		:	'vendor_created_message',
								category	:	'user',
								message		:	'vendor applications was submitted',
								link		:	''
							},
							{
								code		:	2001,
								name		:	'vendor_approval_message',
								category	:	'vendor',
								message		:	'Vendor status now approved',
								link		:	'store/create'
							},
							{
								code		:	2002,
								name		:	'vendor_createstore_message',
								category	:	'vendor',
								message		:	'Create a store now',
								link		:	'store/create'
							},
							{
								code		:	2003,
								name		:	'store_approval_message',
								category	:	'vendor',
								message		:	'Your store has been approved',
								link		:	'stores/view'
							},
							{
								code		:	2004,
								name		:	'store_manage_message',
								category	:	'vendor',
								message		:	'Manage your store',
								link		:	'stores/view'
							}
					]

module.exports = notification;