const vendorlevel	=	[
	{	level1 		:	{
							level		:	'0000x1000',
							name		:	'basic',
							MaxStores	:	1,
							MaxUsers	:	1,
							MallAccess	:	null
						}
	},
	{	level2		:	{
							level		:	'0000x2000',
							name		:	'standard',
							MaxStores	:	5,
							MaxUsers	:	2,
							MallAccess	:	2
						}	
	},
	{	level3		:	{
							level		:	'0000x3000',
							name		:	'Enterprise',
							MaxStores	:	10,
							MaxUsers	:	5,
							MallAccess	:	5
						}
	},
	{	level4		:	{
							level		:	'0000x4000',
							name		:	'Global',
							MaxStores	:	20,
							MaxUsers	:	10,
							MallAccess	:	10
						}
	}
];

module.exports = vendorlevel;