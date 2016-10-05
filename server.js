var express = require('express'),
 app = express(),
 mongoose = require('mongoose'),
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;
 AWS = require('aws-sdk'),
 dynamoose = require('dynamoose'),
 morgan    = require('morgan'),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override'),
 soap = require('soap'),
 router = require('./routes/index.js');

dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

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
app.use(passport.initialize());
app.use('/', router)

//Passport Config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

AWS.config.region = "us-east-1";

var xml = require('fs').readFileSync('./dashboardBackend.wsdl', 'utf8');

var dashboardBackendService = {
    dashboardBackend: {
        recordEvent: function(args) {
            return {
                greeting: "HELLO"
            };
        }
    }
}

//listen
app.listen(5001, function () {
    console.log("App listening on 5001");
    soap.listen(app, '/wsdl/', dashboardBackendService, xml);
});

soap.log = function(type, data) {
    console.log(type);
    console.log(data);
};
