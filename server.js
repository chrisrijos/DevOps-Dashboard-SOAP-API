var express = require('express'),
 app = express(),
 mongoose = require('mongoose'),
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 path = require('path'),
 AWS = require('aws-sdk'),
 dynamoose = require('dynamoose'),
 connect = require('connect'),
 session = require('express-session'),
 DynamoDBStore = require('connect-dynamodb')({session: session}),
 firebase = require("firebase"),
 morgan    = require('morgan'),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override'),
 soap = require('soap'),
 router = require('./routes/index.js'),
 shortid = require('shortid');

app.use(express.static(__dirname + '/public/'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(session({store: new DynamoDBStore({region: 'us-east-1', tableName: 'MessageTable', cleanupInterval: 100000}), secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use('/', router);

//view engine for server
app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');

//config dom assets
//app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public/img'));
app.use(express.static(__dirname + '/public/partials'));

//Passport Config
var Message = require('./models/Message');
var dynamodb = new AWS.DynamoDB();


dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

var xml = require('fs').readFileSync('./dashboardBackend.wsdl', 'utf8');

var dashboardBackend = {
      dashboardBackendSOAP: {
        clearDB: function(args) {
          var m = new Message({
              id: shortid.generate(),
              data: String(args)
          });
          m.save();
        },

        setupSteps: function(args) {
          var m = new Message({
              id: shortid.generate(),
              data: String(args)
          });
          m.save();
        },

        setupComponents: function(args) {
          var m = new Message({
              id: shortid.generate(),
              data: String(args)
          });
          m.save();
        },

        recordEvent: function(args) {
          var m = new Message({
              id: shortid.generate(),
              data: String(args)
          });
          m.save();
        }
    }
}


//listen
app.listen(process.env.PORT || 5001, function () {
    console.log("Dashboard Listening");
    soap.listen(app, '/wsdl/', dashboardBackend, xml);
});

soap.log = function(type, data) {

    console.log(type);
    console.log(data);
};
