const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const songsRouter = require('./songs.js');
const usersRouter = require('./users.js');

// these both start with /api
router.use('/songs', songsRouter);
router.use('/users', usersRouter);

module.exports = router;