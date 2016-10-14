var express = require('express'),
    SoftwareComponent = require('../models/SoftwareComponent'),
    shortid = require('shortid'),
    AWS = require('aws-sdk'),
    router = express.Router();


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/teststorage', function (req, res) {
    var o = new SoftwareComponent({
        id: shortid.generate(),
        data: shortid.generate(),
        timeInMS: shortid.generate(),
        stepResult: shortid.generate(),
        notes: shortid.generate(),
        apiKey: shortid.generate()
    });
    o.save();
});

router.get('/SoftwareComponents/show', function (req, res) {
    SoftwareComponent.scan().exec( function (err, SoftwareComponents) {
      var obj = SoftwareComponents;
      if (err) { console.log(err) }
        res.setHeader('Content-type', 'application/json');
        res.send(JSON.stringify(obj))
    });
});

module.exports = router;
