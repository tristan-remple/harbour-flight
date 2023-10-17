// import mongoose
const mongoose = require("mongoose");

// define the schema, based on the data
const schema = mongoose.Schema({
    "commonName": String,
    "scientificName": {
        "order": String,
        "family": String,
        "genus": String,
        "species": String,
        "subSpecies": [
            String
        ]
    },
    "observations": Number,
    "months": {
        "first": Number,
        "last": Number
    },
    "hours": {
        "first": Number,
        "last": Number
    },
    "locations": [
        {
            "title": String,
            "lat": Number,
            "lon": Number
        }
    ],
    "photo": String
}, {
    collection: "birds"
});

// set the export to the model based on the schema
module.exports = mongoose.model('Bird', schema);