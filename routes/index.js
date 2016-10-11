var express = require('express'),
<<<<<<< HEAD
    Account = require('../models/Message'),
=======
    Account = require('../models/account'),
>>>>>>> 57414ea53586d598b0f3b1e400601dbc211c4b79
    AWS = require('aws-sdk'),
    router = express.Router();

var dynamodb = new AWS.DynamoDB();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/ping', function (req, res) {
    res.render('index.html');
});

<<<<<<< HEAD
=======

>>>>>>> 57414ea53586d598b0f3b1e400601dbc211c4b79
module.exports = router;
