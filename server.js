var express   = require('express');
var app       = express();
var mongoose  = require('mongoose');
var morgan    = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes.js')(app);

//config dom assets
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public/img'));
app.use(express.static(__dirname + '/public/partials'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//listen
app.listen(process.env.PORT || 8080);
console.log('App listening on port 8080');
