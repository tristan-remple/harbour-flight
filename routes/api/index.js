const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const songsRouter = require('./songs.js');
const usersRouter = require('./users.js');
const birdsRouter = require('./birds.js');

// these both start with /api
router.use('/songs', songsRouter);
router.use('/users', usersRouter);
router.use('/birds', birdsRouter);

router.get('/*', (req, res) => {
    res.status(404).send('The endpoint you are trying to access does not exist.');
})

module.exports = router;