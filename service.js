var SoftwareComponent = require('./models/SoftwareComponent'),
   AWS = require('aws-sdk'),
   shortid = require('shortid'),
   dynamodb = new AWS.DynamoDB();

var service = {
      dashboardBackend: {
        dashboardBackendSOAP: {
              clearDB: function(args) {
                  var params = {
                      TableName : "SoftwareComponent"
                  };
                 /* dynamodb.deleteTable(params, function(err, data) {
                      if (err) { console.log("Error delete table..", JSON.stringify(err, null, 2)); }
                      else {
                          console.log("Deleted table..");
                          return {
                              name: args.name
                          }
                      }
                  });*/
                  return {
                      name: args.name
                  };
              },
              setupSteps: function(args) {
                  return {
                      name: args.name
                  };
              },
              setupComponents: function (args) {
                  return {
                      name: args.name
                  };
              },
              recordEvent: function(args) {
                  console.log(args);
                  var payload = {
                      componentName: args["componentName"],
                      versionName: args["versionName"],
                      stepName: args["stepName"],
                      timeInMS: args["timeInMS"],
                      stepResults: args["stepResult"],
                      notes: args["notes"]
                  }
                  saveComponent(payload);
                  return {
                      name: args.name
                  };
              },
              HeadersAwareFunction: function(args, cb, headers) {
                  return {
                      name: headers.Token
                  };
              },
          }
      }
}

function saveComponent(payload) {
    var o = new SoftwareComponent({
      _id: shortid.generate(),
      componentName: payload["componentName"],
      versionName: payload["versionName"],
      stepName: payload["stepName"],
      timeInMS: payload["timeInMS"],
      stepResult: payload["stepResults"],
      notes: payload["notes"]
    });
    console.log(o)
    o.save();
}



module.exports = service;
