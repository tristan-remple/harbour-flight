// import the jwt module
const jwt = require('jsonwebtoken');

// define a middleware function
const verifyJWT = (req, res, next) => {

    // check if the token has been set
    if (req.header('x-auth-token')) {

        // check if the token is valid
        if (jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET)) {
            next();

        // process failures
        } else {
            res.status(401).send("The token could not be validated.");
        }
    } else {
        res.send(401).send("No token was found.");
    }
}

// export
module.exports = verifyJWT;