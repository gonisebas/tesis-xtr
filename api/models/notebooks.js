var mongoose = require('mongoose');

module.exports = mongoose.model('Notebook', {
		name: String ,
		screen: String,
		price: Number,
		trademark: String,
		ram: Number,
		hardDisk: Number,
		state: String,
		batery: String,
    	webcam: Boolean,
    	bluetooth: Boolean,
    	operating_system: String,
    	price: Number,
    	microDescription: String,
    	microFamily: String,
    	code: Number
	});


