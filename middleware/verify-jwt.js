// import the jwt module
const jwt = require('jsonwebtoken');

// define a middleware function
const verifyJWT = (req, res, next) => {

    // check if the token has been set
    if (req.header('x-auth-token')) {
        
        // check if the token is valid
        // if no callback is supplied, it will throw an error on its own
        jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET, function(err, decoded) {

            // in the callback, check if the jwt was decoded successfully
            if (decoded) {
                next();
            } else {
                res.status(401).send("The token could not be validated.");
            }
        });
    
    // if there is no token, send back an error
    } else {
        res.send(401).send("No token was found.");
    }
}

// export
module.exports = verifyJWT;