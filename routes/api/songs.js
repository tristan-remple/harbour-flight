const express = require('express');
const router = express.Router();

const Song = require("../../models/song");

router.get('/', (req, res) => {
    Song.find({}).exec().then(songs => {
        res.send(songs);
    }).catch(err => {
        console.log(err);
    })
});

router.get('/:id', (req, res) => {
    res.send(`Getting song ${req.params.id}`);
});

router.post('/', (req, res) => {

    const newSong = new Song(req.body);
    newSong.save().then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.send(err);
    });
});

router.put('/:id', (req, res) => {
    res.send(`Song ${req.params.id} has been updated`);
});

router.delete('/:id', (req, res) => {
    res.send(`Song ${req.params.id} has been deleted`);
});

module.exports = router;