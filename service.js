var SoftwareComponent = require('./models/SoftwareComponent'),
 AWS = require('aws-sdk'),
 dynamodb = new AWS.DynamoDB();

var service = {
      dashboardBackend: {
        dashboardBackendSOAP: {
              clearDB: function(args) {
                  return {
                      name: args.name
                  }
              },
              setupSteps: function(args) {
                  console.log(args);
                  return {
                      name: args.name
                  };
              },
              setupComponents: function(args) {
                  console.log(args);
                  return {
                      name: args.name
                  };
              },
              recordEvent: function(args) {
                  console.log(args);
                  return {
                      name: args.name
                  };
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

module.exports = service;
