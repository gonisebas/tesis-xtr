//File: controllers/notebooks.js
//var mongoose = require('mongoose');
var Notebook  = require('../models/notebooks');//mongoose.model('Notebook');

//GET - Return all notebooks in the DB
exports.findAllNotebooks = function(req, res) {
	Notebook.find(function(err, notebooks) {
    if(err) res.status(500).send(err.message);

    console.log('GET /notebooks')
		res.status(200).jsonp(notebooks);
	});
};

//GET - Return a Notebook with specified ID
exports.findById = function(req, res) {
	Notebook.findById(req.params.id, function(err, notebook) {
    if(err) res.status(500).send(err.message);

    console.log('GET /notebooks/' + req.params.id);
		res.status(200).jsonp(notebook);
	});
};

exports.find = function(req, res) {
	var query = Notebook.find();

	buildWhereParam("trademark", query);
	buildWhereParam("ram", query);
	buildWhereParam("screen", query);
	buildWhereParam("hardDisk", query);
	buildWhereParam("state", query);
	buildWhereParam("microFamily", query);

	var minPrice = req.query['minPrice'];
	if (minPrice){
		query = query.where('price').gt(minPrice);
	}

	var maxPrice = req.query['maxPrice'];
	if (maxPrice){
		query = query.where('price').lt(maxPrice);
	}

	console.log(JSON.stringify(query));
	query.exec(function(err, notebooks){
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(notebooks);
	})

	function buildWhereParam(field, query){
		var values = req.query[field];
		if(values){
			query = Array.isArray(values)?query.where(field).in(values): query.where(field).equals(values);
		}
	}

};

//POST - Insert a new Notebook in the DB
exports.addNotebook = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var notebook = new Notebook({
		name:    req.body.name,
		screen: 	  req.body.screen,
		price: req.body.price,
		trademark: req.body.trademark,
		ram: req.body.ram,
		hardDisk: req.body.hardDisk,
		state: req.body.state
		/**
		batery: String,
    	webcam: Boolean,
    	bluetooth: Boolean,
    	operating_system: String,
    	price: Number,
    	microDescription: String,
    	microFamily: String
    	*/
	});

	notebook.save(function(err, notebook) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(notebook);
	});
};