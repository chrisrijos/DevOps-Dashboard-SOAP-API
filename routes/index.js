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
    var role = new User({
        _id: shortid.generate(),
        //_uuid: ,
        email: tmp.email,
        password: tmp.password
    });
    role.save();
});

router.post('/User/delete', function(req, res) {
    var toDelete = new User({
        _id: req.body._id,
        email: req.body.email,
        password: req.body.password
    });
    toDelete.delete(function(err) {
        if(err) { return console.log(err) }
        console.log("Deleted");
    });
});

module.exports = router;
