//Article Reference: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
const express = require('express');
const router = express.Router();
const ScaleScheme = require('./app/models/Scale') 

//Post Method
router.post('/scale', async (req, res) => {
    const scaleData = new Model ({
        name: req.body.name,
        author: req.body.author,
        isPreset: req.body.isPreset,
        scaleDegrees: req.body.scaleDegrees,
        sustainMode: req.body.sustainMode,
        startingFreq: req.body.startingFreq,
        periodRatio: req.body.periodRatio,
    })

    try {
        const saveNewScale = await scaleData.save();
        res.status(200).json(saveNewScale)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/scales', (req, res) => {
    res.send('Get all scales')
})

//Get by ID Method
router.get('/:id', (req, res) => {
    res.send('Get scale by ID')
})

//Update by ID Method
router.patch('/:id', (req, res) => {
    res.send('Update scale by ID')
})

//Delete by ID Method
router.delete('/:id', (req, res) => {
    res.send('Delete scale by ID')
})

module.exports = router;