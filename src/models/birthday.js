var mongoose 	=	require('mongoose');


var birthdaySchema	=	new mongoose.Schema({
	birthday: Date
});

module.exports	=	mongoose.model('birthday', birthdaySchema );