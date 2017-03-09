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


// routes ======================================================================
require('./api/routes.js')(app, express);

app.use(express.static('public'));
app.use(express.static('xtr'));
app.use(express.static('node_modules'));

var path = require('path');
app.get('*', function (req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});