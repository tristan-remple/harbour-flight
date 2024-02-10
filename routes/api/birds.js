// import express and initialize the router
const express = require('express');
const router = express.Router();

// using multer for files
const multer = require('multer');

// set multer to store the images in the img folder
// and keep the original filename
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'client/public/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// set multer to only accept images
const imageOnly = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb("Photo must be an image.", false);
    }
}

// apply settings to multer, which can now be used as a function/middleware
const upload = multer({
    storage: storage,
    fileFilter: imageOnly
}).single('photo');

// bring in the bird model
const Bird = require("../../models/bird");

const verifyJWT = require("../../middleware/verify-jwt");

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

// get all birds
router.get('/', (req, res) => {

    // find query with no criteria, execute the query and then process the promise
    Bird.find().sort({'observations': 'desc'}).exec().then(birds => {
        
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

        // function will send back either 400 or 500
        catchError(err, res);
        
    });

});

// upload an image
// the database reference to the image is separate
router.post('/image', verifyJWT, (req, res) => {

    // call the multer upload function
    // note that this will overwrite files if overlap occurs
    upload(req, res, function(err) {

        // this error was set in the fileFilter for invalid mimetypes
        if (err === "Photo must be an image.") { 
            res.status(401).send(err);

        // errors other than the one we sent might be on our end
        } else if (err) {
            res.status(500).send(err);

        // no error: file upload success
        } else {
            res.status(201).send();
        }
    });

});

// post a new bird
router.post('/', verifyJWT, (req, res) => {

    // create a new bird object using the bird model and the request body data
    const newBird = new Bird(req.body);

    // attempt to save it to the database, which is already open
    newBird.save().then(result => {

        // result is the object the database has, which includes id and version
        // send it back with a 201 created code
        res.status(201).send(result);
    }).catch(err => {

        // function will send back either 400 or 500, or 422 in this case
        catchError(err, res);

    });
});

// update one bird
router.patch('/:id', verifyJWT, (req, res) => {

    // set the id back into the object body
    req.body.id = req.params.id;

    // use a find and update query
    // returnDocument: after -> returns the document after updates
    // validation has to be switched on, and will only validate new content, not existing fields
    Bird.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
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

        // function will send back either 400 or 500, or 422 in this case
        catchError(err, res);

    })
});

// delete one bird
router.delete('/:id', verifyJWT, (req, res) => {

    
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