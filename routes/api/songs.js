const express = require('express');
const router = express.Router();

const Song = require("../../models/song");

const demoMiddleware = require("../../middleware/demo");

router.get('/', (req, res) => {
    Song.find({}).exec().then(songs => {
        res.send(songs);
    }).catch(err => {
        res.send(500);
    })
});

router.get('/:id', demoMiddleware, (req, res) => {
    Song.findById(req.params.id).exec().then(songData => {
        if (songData) {
            res.send(songData);
        } else {
            res.status(404).send();
        }
    }).catch(err => {
        if (err.name === "CastError") {
            res.status(400).send("Improperly formatted ID.")
        } else {
            res.status(500).send();
        }
    });
});

router.post('/', (req, res) => {

    const newSong = new Song(req.body);
    newSong.save().then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.status(422).send(err);
    });
});

router.put('/:id', (req, res) => {
    res.findById(req.params.id).exec().then(songData => {
        songData.save().exec().then()
    }).catch(err => {

    });
});

router.delete('/:id', (req, res) => {
    Song.findByIdAndDelete(req.params.id).exec().then(result => {
        if (!result) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    }).catch(err => {
        if (err.name === "CastError") {
            res.status(400).send("Improperly formatted ID.")
        } else {
            res.status(500).send(err);
        }
    });
});

module.exports = router;