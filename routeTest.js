//Article Reference: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
const express = require('express');
const router = express.Router();
//Load Scale Schema
const ScaleSchema = require('./app/models/Scale') 

router.post('/scale', async (req, res) => {
    const scaleData = new ScaleSchema ({
        name: req.body.name,
        author: req.body.author,
        isPreset: req.body.isPreset,
        scaleDegrees: req.body.scaleDegrees,
        sustainMode: req.body.sustainMode,
        startingFreq: req.body.startingFreq,
        periodRatio: req.body.periodRatio,
    })

    try {
        console.log(scaleData)
        await scaleData.save();
        res.status(200).json('Scale Saved')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/scales', async (req, res) => {
    try{
        const data = await ScaleSchema.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
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
router.delete('/delete/:id', async (req, res) => {
    res.send('Delete scale by ID')
})

module.exports = router;