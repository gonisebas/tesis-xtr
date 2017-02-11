var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/xtr', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
/**var models     = require('./models/notebooks')(app, mongoose);
var NotebookCtrl = require('./controllers/notebooks');
*/

// Example Route
/**var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
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
*/
// routes ======================================================================
require('./api/routes.js')(app, express);

app.use(express.static('public'));
app.use(express.static('node_modules'));

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
