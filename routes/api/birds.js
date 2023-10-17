// import express and initialize the router
const express = require('express');
const router = express.Router();

// bring in the bird model
const Bird = require("../../models/bird");

// get all birds
router.get('/', (req, res) => {

    // find query with no criteria, execute the query and then process the promise
    Bird.find({}).exec().then(birds => {

        // the promise gives us the data, we send it with the default 200 status
        res.send(birds);
    }).catch(err => {

        // if there's an error, send a server error to the client
        res.status(500).send();
    });
});

// get one specific bird
router.get('/:id', (req, res) => {

    console.log(req.params.id);

    // query the birds for a specific id
    Bird.findById(req.params.id).exec().then(birdData => {

        // send it if no errors occur
        res.send(birdData);
    }).catch(err => {

        // if there's an error, tell the client about it
        // needs work
        res.status(400).send();
    });

});

// post a new bird
router.post('/', (req, res) => {

    // create a new bird object using the bird model and the request body data
    const newBird = new Bird(req.body);

    // attempt to save it to the database, which is already open
    newBird.save().then(result => {

        // result is the object the database has, which includes id and version
        // send it back with a 201 created code
        res.status(201).send(result);
    }).catch(err => {

        // if there's an error, send it to the client
        // this needs refining
        res.send(err);
    });
});

// replace one bird
router.put('/:id', (req, res) => {

    // set the id back into the object body
    req.body.id = req.params.id;

    // use a find and update query
    Bird.findOneAndUpdate({ id: req.params.id }, req.body).exec().then(birdData => {

        // assuming it returns the updated object, pass that along to the user
        res.status(204).send(birdData);
    }).catch(err => {

        // otherwise, send the error
        res.send(err);
    })
});

// delete one bird
router.delete('/:id', (req, res) => {

    // use a delete query
    Bird.delete({ id: req.params.id }, req.body).exec().then(response => {

        // assuming it returns anything, pass that along to the user
        res.status(201).send(response);
    }).catch(err => {

        // otherwise, send the error
        res.send(err);
    })
});

module.exports = router;