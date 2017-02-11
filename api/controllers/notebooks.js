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
	Notebook.find({microId:1}, function(err, notebook) {
    if(err) res.status(500).send(err.message);

    console.log('GET /notebooks/' + req.params.id);
		res.status(200).jsonp(notebook);
	});
};

exports.find = function(req, res) {
	var query = Notebook.find();

	//trademark
	var trademark = req.query.trademark;
	if(trademark){
		query = Array.isArray(trademark)?query.where("trademark").in(trademark): query.where("trademark").equals(trademark);
	} 

	query.exec(function(err, notebooks){
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(notebooks);
	})

};

//POST - Insert a new Notebook in the DB
exports.addNotebook = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var notebook = new Notebook({
		name:    req.body.name,
		screen: 	  req.body.screen,
		micro:  req.body.microId,
		price: req.body.price,
		trademark: req.body.trademark,
		ram: req.body.ram,
		hardDisk: req.body.hardDisk,
		state: req.body.state
	});

	notebook.save(function(err, notebook) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(notebook);
	});
};
