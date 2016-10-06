var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html');
});

router.get('/register', function (req, res) {
    res.render('register', {}); 
});

router.get('/login', function (req, res) {
    res.render('login', { user : req.user });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.render('index.html');
});

router.post('/register', function (req, res) {
	Account.register(new Account({ username : req.body.username }), req.body.password, function (err, account) {
		if (err) {
		    return res.render('register.html', { account : account });
		}

		passport.authenticate('local')(req, res, function () {
		  	res.redirect('/');	
		});
	});
});

module.exports = router;
