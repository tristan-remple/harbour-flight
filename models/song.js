const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    artist: String,
    releaseYear: Number,
    genres: [String],
    ratings: [Number]
}, {
    collection: "CoolSongs"
});

// capitalized and singular name, it's the only export
module.exports = mongoose.model('Song', schema);