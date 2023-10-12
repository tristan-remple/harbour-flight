const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Songs API: Full Collection');
});

router.get('/:id', (req, res) => {
    res.send(`Getting song ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create new song');
});

router.put('/:id', (req, res) => {
    res.send(`Song ${req.params.id} has been updated`);
});

router.delete('/:id', (req, res) => {
    res.send(`Song ${req.params.id} has been deleted`);
});

module.exports = router;