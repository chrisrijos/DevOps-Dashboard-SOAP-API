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
                  if (args["componentName"] &&  args["apiKey"] !== null){
                      var data = {
                        componentName: args["componentName"],
                        apiKey: args["apiKey"]
                      }
                      for (i = 0; i < data["componentName"].length; i++) {
                        var o = new SoftwareComponent({
                            id: shortid.generate(),
                            componentName: data["componentName"][i],
                            versionName:  "",
                            stepName: "",
                            timeInMS: "",
                            stepResult: "",
                            notes: "",
                            apiKey: data['apiKey']
                      });

                    }
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

module.exports = service;
