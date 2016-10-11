var express = require('express'),
    Account = require('../models/Message'),
    AWS = require('aws-sdk'),
    router = express.Router();

var dynamodb = new AWS.DynamoDB();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/ping', function (req, res) {
    res.render('index.html');
});

module.exports = router;
