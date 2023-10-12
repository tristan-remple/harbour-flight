// bring in express and initialize a router
var express = require('express');
var router = express.Router();

/* GET users listing. */
// requests get here from /users
// so since /users is a given, / refers to /users/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// send the router back to app.js
module.exports = router;