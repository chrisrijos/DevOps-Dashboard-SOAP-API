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
});

router.get('/messages/show', function (req, res) {
    Message.scan().exec( function (err, messages) {
      var obj = messages;
      if (err) { console.log(err) }
        res.setHeader('Content-type', 'application/json');
        res.send(JSON.stringify(obj))
    });
});

module.exports = router;
