module.exports = {

    var AWS = require('aws-sdk')
    
    AWS.config.update({
        region: 'us-east-1',
        endpoint: "http://localhost:8080"
    });

    var dynamodb = new AWS.DynamoDB();


    //configure table params
    //change keytypes and atribute types and fix partition keys
    var params = {
            TableName : "MessageLog",
            KeySchema: [       
                        { AttributeName: "sender", KeyType: "HASH"},  //Partition key (Primary Key)
                        { AttributeName: "subject", KeyType: "RANGE" }  //Sort key
                    ],
            AttributeDefinitions: [       
                        { AttributeName: "sender", AttributeType: "N" },
                        { AttributeName: "subject", AttributeType: "S" }
                    ],
            ProvisionedThroughput: {       
                        ReadCapacityUnits: 10, 
                        WriteCapacityUnits: 10
                    }
    };
    
    dynamodb.createTable(params, function(err, data) {
           if (err) {
                      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                  } else {
                      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                  }
    }); 
};
