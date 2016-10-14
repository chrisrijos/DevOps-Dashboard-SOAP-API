var express = require('express'),
    SoftwareComponent = require('../models/SoftwareComponent'),
    shortid = require('shortid'),
    AWS = require('aws-sdk'),
    router = express.Router();


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/SoftwareComponents/showall', function (req, res) {
    SoftwareComponent.scan().exec( function (err, SoftwareComponents) {
      if (err) { console.log(err) }
        res.setHeader('Content-type', 'application/json');
        res.send(JSON.stringify(SoftwareComponents));
    });
});

module.exports = router;
