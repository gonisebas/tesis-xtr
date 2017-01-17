//File: controllers/notebooks.js
var mongoose = require('mongoose');
var Notebook  = mongoose.model('Notebook');

//GET - Return all notebooks in the DB
exports.findAllNotebooks = function(req, res) {
	Notebook.find(function(err, notebooks) {
    if(err) res.send(500, err.message);

    console.log('GET /notebooks')
		res.status(200).jsonp(notebooks);
	});
};

//GET - Return a Notebook with specified ID
exports.findById = function(req, res) {
	Notebook.findById(req.params.id, function(err, notebook) {
    if(err) return res.send(500, err.message);

    console.log('GET /notebooks/' + req.params.id);
		res.status(200).jsonp(notebook);
	});
};

//POST - Insert a new Notebook in the DB
exports.addNotebook = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var notebook = new Notebook({
		name:    req.body.name,
		screen: 	  req.body.screen,
		microId:  req.body.microId
	});

	notebook.save(function(err, notebook) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(notebook);
	});
};
