// import mongoose
const mongoose = require("mongoose");

// validate months
const monthsSchema = mongoose.Schema({
    first: {
        type: Number,
        min: 1,
        max: 12,
        validate: Number.isInteger
    },
    last: {
        type: Number,
        min: 1,
        max: 12,
        validate: Number.isInteger
    }
}, { _id : false });

// validate hours
const hoursSchema = mongoose.Schema({
    first: {
        type: Number,
        min: 0,
        max: 23,
        validate: Number.isInteger
    },
    last: {
        type: Number,
        min: 0,
        max: 23,
        validate: Number.isInteger
    }
}, { _id : false });

// validate location
const locationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        min: 0,
        max: 90,
        validate: {
            validator: function(val) {
                return /[0-9]{1,2}.[0-9]{4,6}/.test(val);
            }
        }
    },
    lon: {
        type: Number,
        min: 0,
        max: 180,
        validate: {
            validator: function(val) {
                return /^[0-9]{1,3}.[0-9]{4,6}$/.test(val);
            }
        }
    }
}, { _id : false });

// define the schema, based on the data
const birdSchema = mongoose.Schema({
    "commonName": {
        type: String,
        validate: {
            validator: function(val) {
                return val.length > 2;
            }
        },
        required: true
    },
    "scientificName": {
        "order": String,
        "family": String,
        "genus": String,
        "species": String,
        "subSpecies": [
            String
        ]
    },
    "observations": {
        type: Number,
        min: 1,
        validate : Number.isInteger,
        required: true
    },
    "months": {
        type: monthsSchema
    },
    "hours": {
        type: hoursSchema
    },
    "locations": [
        {
            type: locationSchema,
            // required: true
        }
    ],
    "photo": {
        type: String,
        // required: true
    }
}, {
    collection: "birds"
});

// set the export to the model based on the schema
module.exports = mongoose.model('Bird', birdSchema);