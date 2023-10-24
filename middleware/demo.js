// function expression syntax uses the fat arrow =>
const demoMiddleware = (req, res, next) => {
    // check for a header called x-foo
    if (req.header('x-foo')) {

        // if it exists, respond with the contents
        res.send(req.header('x-foo'));

    } else {
        // if not, allow to continue
        next();
    }
}

module.exports = demoMiddleware;