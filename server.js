var express = require('express');
var app = express();
var mongoose = require('mongoose');
var AWS = require('aws-sdk');
var dynamoose = require('dynamoose');
var morgan    = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var soap = require('soap');
var routes = require('./routes.js')(app);

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

AWS.config.region = "us-east-1";

var xml = require('fs').readFileSync('./dashboardBackend.wsdl', 'utf8');

var service = {
    mService: {
        mPort: {
            mFunction: function(args) {
               return {
                  name: args.name
               };
            }    
        },
        
            mAsyncFunc: function(args, callback) {
            callback({
                name: args.name
            });
        },

        //receive incoming headers
        HeadersAwareFunction: function(args, cb, headers) {
            return {
                name: headers.Token
            };
        }
    }
};

//listen
app.listen(process.env.PORT || 8080);
console.log('App listening on port 8080');
app.listen(8001, function () {
    console.log("Soap Server Listening");
    soap.listen(app, '/wsdl/', service, xml);
});

soap.log = function(type, data) {
    console.log(type);
    console.log(data);
};
