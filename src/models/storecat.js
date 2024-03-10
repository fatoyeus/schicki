var mongoose 		=	require('mongoose');


var storecatSchema	=	new mongoose.Schema({
												name	:	{type:	String, required:	true, unique:	true },
												status	 :  {type:	Number, default: 	444}
											});

module.exports		=	mongoose.model('storecat', storecatSchema );