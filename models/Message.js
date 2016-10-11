var dynamoose = require('dynamoose');
var Schema = dynamoose.Schema;

dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

var Message = new Schema({
    id: String,
    data: String
});

module.exports = dynamoose.model('Message', Message);
