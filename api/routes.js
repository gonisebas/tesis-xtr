var path = require('path');

var NotebookCtrl = require('./controllers/notebooks');

 module.exports = function(app, express) {

	var router = express.Router();
	router.get('/', function(req, res) {
	  
		res.sendFile(path.resolve('public/index.html')); // load the single view file (angular will handle the page changes on the front-end)

	});
	app.use(router);

	// API routes
	var apiRoutes = express.Router();

	apiRoutes.route('/notebooks')
	  .get(NotebookCtrl.findAllNotebooks)
	  .post(NotebookCtrl.addNotebook);

	apiRoutes.route('/notebooks/:id')
	  .get(NotebookCtrl.findById);

	app.use('/api', apiRoutes);
 }