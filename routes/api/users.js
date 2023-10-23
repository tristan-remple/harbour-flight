// bring in express and initialize a router
var express = require('express');
var router = express.Router();

// bring in the model
const User = require("../../models/user");

// encryption and token modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// password checker, logic is based on the one from INET
function checkPassword(val) {

    // .* is "zero or more wildcard characters"
    // [^] hat inside of brackets is "anything other than this"
    // + is "one or more of the preceding range"
    lengthCheck =  val.length <= 255;
    lowercaseCheck = /.*[a-z]+.*/.test(val);
    uppercaseCheck = /.*[A-Z]+.*/.test(val);
    numberCheck = /.*[0-9]+.*/.test(val);
    otherCheck = /.*[^a-zA-Z0-9]+.*/.test(val);
    return lengthCheck && lowercaseCheck && uppercaseCheck && numberCheck && otherCheck;
}

// handles errors that are caught
function catchError(err, res) {

    // cast error means the string provided was not a valid ObjectId according to Mongo
    if (err.name === "CastError") {
        res.status(400).send("Improperly formatted ID.")

    // this will only apply to post and patch
    } else if (err.name === "ValidationError") {
        res.status(422).send(err.message);
    } else {

        // 500 is a catchall for our own errors, especially database connectivity errors
        res.status(500).send("The server has encountered an error. Please come back later.");
    }
}

/* GET users listing. */
// requests get here from /users
// so since /users is a given, / refers to /users/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// register
router.post('/register', (req, res) => {
    
    // valid: strong password, not already registered, valid email

    // check if the email is already in our users list
    User.find({ email: req.body.email }).exec().then(result => {

        // if it's already in use, forbidden + message
        if (result) {
            res.status(403).send("Email is already registered.");
        }
    }).catch(err => {
        res.status(500).send("The server has encountered an error. Please come back later.");
    });

    // if the password checker returns true (strong password)
    // encryption: https://www.npmjs.com/package/bcrypt
    if (checkPassword(req.body.password)) {
        bcrypt.hash(req.body.password, 10, function(err, hash) {

            // once encryption is done, overwrite the plaintext password
            req.body.password = hash;

            // initialize the body as a User according to the schema
            // if the email is invalid, it will fail validation here
            const newUser = new User(req.body);

            // attempt to save it to the database, which is already open
            newUser.save().then(result => {

                // result is the object the database has, which includes id and version
                // send it back with a 201 created code
                res.status(201).send(result);
            }).catch(err => {

                // function will send back either 400 or 500
                catchError(err, res);

            });
        });
    }

});

// login
router.post('/login', (req, res) => {

    // check for existing user
    User.find({ email: req.body.email }).exec().then(findres => {

        if (empty(findres)) {

            // the request was successful but found nothing
            res.status(401).send("Invalid login credentials.");
        }

        // verify password
        bcrypt.compare(req.body.password, findres.password, function(err, result) {

            // if valid, create and assign token
            if (result) {

                // using env as recommended here: https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it
                const token = jwt.sign({ email: findres.email }, process.env.JWT_SECRET);

                // expires in 2 days
                res.cookie('jwt', token, { maxAge: 172800 }).status(200).send("Welcome");
            } else {

                // password is not valid
                // 401 unauthorized is the login fail response code
                res.status(401).send("Invalid login credentials.");
            }
        });
    }).catch(err => {

        // function will send back either 400 or 500
        catchError(err, res)
    });
    
});

// send the router back to app.js
module.exports = router;