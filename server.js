var express = require('express'),
 app = express(),
 mongoose = require('mongoose'),
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 path = require('path'),
 AWS = require('aws-sdk'),
 dynamoose = require('dynamoose'),
 session = require('express-session'),
 connect = require('connect'),
 DynamoDBStore = require('connect-dynamodb')({session: session});
 firebase = require("firebase"),
 morgan    = require('morgan'),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override'),
 soap = require('soap'),
 router = require('./routes/index.js');

app.use(express.static(__dirname + '/public/'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(session({store: new DynamoDBStore({region: 'us-east-1', tableName: 'sessionTable', cleanupInterval: 100000}), secret: 'keyboard cat'}));
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
var Account = require('./models/account');

dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

var xml = require('fs').readFileSync('./dashboardBackend.wsdl', 'utf8');

var dashboardBackend = {
    dashboardBackendSOAP: {
        recordEvent: function(args) {
            return {
                greeting: args.name
            };
        }
    }
}

var url = "http://localhost:5001/wsdl";
var args = {name: 'tns:dashboardBackend'}

soap.createClient(url, function (err, client) {
    console.log(client)
    console.log(err)
});



//listen
app.listen(5001, function () {
    console.log("App listening on 5001");

    soap.listen(app, '/wsdl', dashboardBackend, xml);
});

soap.log = function(type, data) {
    console.log(type);
    console.log(data);
};
