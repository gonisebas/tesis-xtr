var mongoose = require('mongoose');

module.exports = mongoose.model('Notebook', {
		name: String ,
		screen: String,
		microId: String
	});
