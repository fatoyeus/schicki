let   express  		    =  		require('express'),
      router			=		express.Router(),
	  bcrypt			=		require('bcryptjs');


	
const authorization = [
{
	priviledge	: 	15, 
	module		:	'Admins',
	ref			: 	[
						
						{
							name	: 'Access and Permissions',
					 		path 	: '/admin/3***5*1*/adminpermissions'
						}
					],  
	description	:	'Manage Administrators'
},
{
	priviledge	:	14, 
	module		:	'Accounts',
	ref			:	[
						{
							name	: 'Create Admins',
					 		path 	: '/admin/c14/new/profile'
						},
					],
	description	:	'Manage accounts'
},
{
	priviledge	: 	13,
	module		:	'APIs',
	ref			:	[
						{
							name	:	'',
							path	:	''}
					],
	description	:	'Manage API components'
},
{
	priviledge	: 	12,
	module		:	'Partners',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage partner components'
},
{
	priviledge	:	 11,
	module		:	'Billing',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage billing components'
},
{
	priviledge	:	 10,
	module		:	'Vendors',
	ref			:	 [
						{
							name	:	 'Vendor Access',
							path	: '/admin/c10/all/vendor/accessmanagement' 						}
					],  
	description	:	'Manage vendor components'
},
{
	priviledge	:	 9,
	module		:	'Orders',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage order components'
},
{
	priviledge	:	8,
	module		:	'Stores',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage store components'
},
{
	priviledge	:	7,
	module		:	'Products',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage product components'
},
{
	priviledge	:	6,
	module		:	'Users',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Manage user components'
},
{	
	priviledge	:	5,
	module		:	'Vendor Messages',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Run vendor communications'
},
{
	priviledge	:	4,
	module		:	'User Messages',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Run user communications'
},
{
	priviledge	:	3,
	module		:	'Vendor Reports',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}	
					],
	description	:	'Run reports on vendor transactions'
},
{
	priviledge	:	2,
	module		:	'User Reports',
	ref			:	[	
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Run reports on user transactions'
},
{	
	priviledge	:	1,
	module		:	'Product Reports',
	ref			:	[
						{
							name	:	'',
							path	:	''
						}
					],
	description	:	'Run reports on product transactions'
}
					  		];


module.exports = authorization;

	

