var dynamoose = require('dynamoose'),
    Schema = dynamoose.Schema;


dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
});

var User = new Schema({
    _id: String,
    _uuid: String,
    email: String,
    password: String
});

module.exports = dynamoose.model('User', User);
