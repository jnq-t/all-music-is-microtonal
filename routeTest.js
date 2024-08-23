//Article Reference: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
const express = require('express');
const router = express.Router();
//Load Scale Schema
const Scale = require('./app/models/Scale') 
const ScaleDegreeModifier = require('./app/models/ScaleDegreeModifier') 


//Scale Degree Modifier Routes
router.post("/scaleDegreeModifier", async (req, res) => {
    let result = await ScaleDegreeModifier.create(req.body);
    res.send(result);
  });

router.get('/scaleDegreeModifiers', async (req, res) => {
    try{
        const data = await ScaleDegreeModifier.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Scale Routes
router.post('/scale', async (req, res) => {
    const scaleData = new Scale ({
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
        const data = await Scale.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// TODO
//Get by ID Method
router.get('/:id', (req, res) => {
    res.send('Get scale by ID')
})

// TODO
//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update scale by ID')
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Scale.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;