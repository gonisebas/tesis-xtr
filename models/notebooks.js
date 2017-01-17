exports = module.exports = function(app, mongoose) {

	var notebookSchema = new mongoose.Schema({
		name: 		{ type: String },
		screen: {type: String},
		microId: {type: String}
	});

	mongoose.model('Notebook', notebookSchema);

};
