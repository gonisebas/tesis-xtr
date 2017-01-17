exports = module.exports = function(app, mongoose) {

	var microprocessorSchema = new mongoose.Schema({
		name: 		{ type: String },
		family: 		{
			type: String,
			enum: ['AMD', 'Intel Celeron', 'Intel Core i3', 'Intel Core i5']
		}
	});

	mongoose.model('Microprocessor', microprocessorSchema);

};