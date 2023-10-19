const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    critic: {
        type: String,
        required: true
    },
    ofFive: {
        type: Number,
        required: true
    }
});

const mainSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    releaseYear: Number,
    genres: [String],
    ratings: [ratingSchema]
}, {
    collection: "CoolSongs"
});

// capitalized and singular name, it's the only export
module.exports = mongoose.model('Song', mainSchema);