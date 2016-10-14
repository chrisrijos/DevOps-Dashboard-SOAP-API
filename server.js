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

var p = 0;

var service = {
      dashboardBackend: {
        dashboardBackendSOAP: {
              clearDB: function(args) {
                  console.log(args.name);
                  return {
                      name: args.name
                  };
              },
              setupSteps: function(args) {
                  console.log("SETUP STEPS");
                  return {
                      name: args.name + "920801803810482"
                  };
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
              },
              HeadersAwareFunction: function(args, cb, headers) {
                  return {
                      name: headers.Token
                  };
              },

              checkRequest: function(args, cb, headers, req) {
                  console.log("Soap request");
                  return {
                      name: headers.Token
                  };
              }
          }
      }
}

app.use(bodyParser.raw({type: function(){ return true; }, limit: '5mb'}));

//listen
app.listen(process.env.PORT || 8080, function () {
    console.log("Dashboard Listening");
    soap.listen(app,
      { path: '/dashboardBackend/',
        services: service,
        xml: xml,

        //wsdl options.
        //envelopeKey: '<pre><b>soap</b>:Body></<b>THIS IS A MESSAGE</b>:Body></pre>',
        attributesKey: 'theAttrs',
        valueKey: 'theVal',
        xmlKey: 'theXml'

      });

    soap.log = function(type, data) {
        console.log(type);
        console.log(data);
    };
});

var url = 'http://localhost:8080/dashboardBackend?wsdl';
