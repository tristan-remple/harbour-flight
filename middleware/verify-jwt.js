const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    if (req.header('x-auth-token')) {
        if (jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET)) {
            next();
        } else {
            res.status(401).send("The token could not be validated.");
        }
    } else {
        res.send(401).send("No token was found.");
    }
}

module.exports = verifyJWT;