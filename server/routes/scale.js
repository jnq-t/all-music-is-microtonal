// routes/api/scale.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Load Scale Model
const Scale = require('../../app/models/Scale')


router.get('/test', (req, res) => res.send('book route testing!'))


  router.get('/', (req, res) => {
    Scale.find()
        .then(books => res.json(books))
        .catch(err => res.status(404).json({noScalesFound: 'No scales found.'}))
});


  module.exports = router;