var express = require('express'),
    SoftwareComponent = require('../models/SoftwareComponent'),
    User = require('../models/User.js'),
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

router.get('/User/showall', function(req, res) {
    User.scan().exec( function (err, Users) {
        if (err) { console.log(err) }
          res.setHeader('Content-type', 'application/json');
          res.send(JSON.stringify(Users));
    });
});

//POST USER Route
router.post('/User/new', function(req, res) {
    var tmp = {
        email: req.body.email,
        password: req.body.password
    }
    //SECONDARY CHECKS Here
    //
    //END
    var role = new User({
        _id: shortid.generate(),
        //_uuid: ,
        email: tmp.email,
        password: tmp.password
    });
    role.save();
});

module.exports = router;
