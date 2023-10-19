// import express and initialize the router
const express = require('express');
const router = express.Router();

// bring in the bird model
const Bird = require("../../models/bird");

// handles errors that are caught
function catchError(err, res) {

    // cast error means the string provided was not a valid ObjectId according to Mongo
    if (err.name === "CastError") {
        res.status(400).send("Improperly formatted ID.")
    } else {

        // 500 is a catchall for our own errors, especially database connectivity errors
        res.status(500).send("The server has encountered an error. Please come back later.");
    }
}

// get all birds
router.get('/', (req, res) => {

    // find query with no criteria, execute the query and then process the promise
    Bird.find().exec().then(birds => {
        
        // the promise gives us the data, we send it with the default 200 status
        if (birds) {
            res.send(birds);
        } else {

            // if we're missing our birds, that's probably on us
            res.status(504).send();
        }
        
    }).catch(err => {

        // if there's an error, send a server error to the client
        res.status(500).send();
    });
});

// get one specific bird
router.get('/:id', (req, res) => {

    // query the birds for a specific id
    Bird.findById(req.params.id).exec().then(birdData => {

        if (birdData) {
            // send it if no errors occur
            res.send(birdData);
        } else {
            // query was successful but returned nothing: 404
            res.status(404).send();
        }
        
    }).catch(err => {

        // if there's an error, tell the client about it
        res.status(404).send();
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
        res.status(404).send();
    });
});

// post a new bird
router.patch('/', (req, res) => {

    console.log("reached endpoint");
    // query the birds for a specific id
    Bird.findById(req.params.id).exec().then(birdData => {

        // change the data properties that are listed in the request body
        for (prop in req.body) {
            birdData[prop] = req.body[prop];
        }

        // attempt to save it to the database, which is already open
        birdData.save().then(result => {

            // result is the object the database has, which includes id and version
            // send it back with a 201 created code
            res.status(201).send(result);
        }).catch(err => {

            console.log("save error");
            // if there's an error, send it to the client
            res.status(504).send();
        });

    }).catch(err => {

        // function will send back either 400 or 500
        catchError(err, res);

    });

});

// replace one bird
router.patch('/:id', (req, res) => {

    // set the id back into the object body
    req.body.id = req.params.id;

    // use a find and update query
    // returnDocument: after -> returns the document after updates
    Bird.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after"
    }).exec().then(birdData => {

        // assuming it returns the updated object, pass that along to the user
        if (birdData) {   
            res.status(201).send(birdData);
        } else {

            // if nothing is returned, we assume nothing was found
            res.status(404).send();
        }

    }).catch(err => {

        // function will send back either 400 or 500
        catchError(err, res);

    })
});

// delete one bird
router.delete('/:id', (req, res) => {

    
    // use a delete query
    Bird.findByIdAndDelete(req.params.id).exec().then(response => {

        // the response should contain the deleted object
        // if there's nothing in the response, the object was not found
        if (!response) {
            res.status(404).send();
        } else {
            // otherwise, it was successful and we return a 204 success with no content
            res.status(204).send();
        }
        
    }).catch(err => {

        // function will send back either 400 or 500
        catchError(err, res);

    })
});

// export it
module.exports = router;