var mongoose = require('mongoose');

module.exports = mongoose.model('Notebook', {
		name: String ,
		screen: Number,
		micro: String,
		price: Number,
		trademark: String,
		ram: Number,
		hardDisk: Number,
		state: String
	});
