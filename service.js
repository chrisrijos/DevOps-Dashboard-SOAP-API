var SoftwareComponent = require('./models/SoftwareComponent'),
   AWS = require('aws-sdk'),
   shortid = require('shortid'),
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
              setupComponents: function (args) {
                  if (args["componentName"] && args["apiKey"] !== null) {
                      var apiKey = args["apiKey"];
                      var arr = args["componentName"];
                      var payload = {
                          versionName: args["versionName"],
                          notes: args["notes"],
                          stepName: args["stepName"],
                          timeInMS: args["timeInMS"],
                          stepResults: args["stepResult"],
                          notes: args["notes"]
                      }
                      arr.forEach(function (item) {
                          console.log(item);
                          saveComponent(item, payload, apiKey);
                      });
                      return {
                          name: args.name
                      };
                  } else {
                      console.log("NULL FOUND");
                  }
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
          }
      }
}

function saveComponent(args, payload, apiKey) {
    var o = new SoftwareComponent({
      _id: shortid.generate(),
      componentName: args,
      versionName: (typeof payload["versionName"] !== 'undefined') ? payload["versionName"] : "default",
      stepName: (typeof payload["stepName"] !== 'undefined') ? payload["stepName"] : "default",
      timeInMS: (typeof payload["timeInMS"] !== 'undefined') ? payload["timeInMS"] : "default",
      stepResult: (typeof payload["stepResult"] !== 'undefined') ? payload["stepResult"] : "default",
      notes: (typeof payload["notes"] !== 'undefined') ? payload["notes"] : "default",
      apiKey: apiKey
    });
    //console.log(o)
    o.save();
}



module.exports = service;
