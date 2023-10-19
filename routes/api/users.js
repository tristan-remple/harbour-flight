// bring in express and initialize a router
var express = require('express');
var router = express.Router();

/* GET users listing. */
// requests get here from /users
// so since /users is a given, / refers to /users/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// register
router.post('/register', (req, res) => {
    // save req.body to database if valid
    // valid: strong password, not already registered, valid email
    // hash password
});

// login
router.post('/login', (req, res) => {
    // check for existing user
    // verify password
    // if valid, create and assign token
    // 401 unauthorized is the login fail response code
});

// send the router back to app.js
module.exports = router;