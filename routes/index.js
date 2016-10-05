var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router();

router.get('/', function (req, res) {
    console.log("/")
    res.render('index.html', { user: req.user });
});

router.get('/register', function (req, res) {
    console.log("/register")
    res.render('index', {}) 
});

router.get('/login', function (req, res) {
    //res.render('login', { user : req.user });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("PING!");
});

module.exports = router;
