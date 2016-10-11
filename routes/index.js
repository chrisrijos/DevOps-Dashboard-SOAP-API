var express = require('express'),
    Message = require('../models/Message'),
    shortid = require('shortid'),
    AWS = require('aws-sdk'),
    router = express.Router();


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/teststorage', function (req, res) {
    var o = new Message({
      id: shortid.generate(),
      data: shortid.generate()
    });
    o.save();
    res.sendStatus(200);
    console.log("We made it...");
});

router.get('/messages/show', function (req, res) {
    Message.scan().exec( function (err, messages) {
      //send messages back to the res as json strings
        console.log(messages)
    });
});

router.get('/ping', function (req, res) {
    res.render('index.html');
});

module.exports = router;
