var dynamoose = require('dynamoose'),
    Schema = dynamoose.Schema;


dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

var SoftwareComponent = new Schema({
    _id: String,
    componentName: String,
    versionName: String,
    stepName: String,
    timeInMS: String,
    stepResult: String,
    notes: String,
    apiKey: String
});

module.exports = dynamoose.model('SoftwareComponent', SoftwareComponent);
