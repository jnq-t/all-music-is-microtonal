// routes/api/books.js
const express = require('express');
const router = express.Router();

// Load Scale Model
const Scale = require('./models/Scale')


// Get a list of 50 scales
router.get("/", async (req, res) => {
    let collection = await db.collection("scales");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });

// Get a single post
router.get("/:id", async (req, res) => {
    let collection = await db.collection("scales");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

// Create new scale
router.post("/", async (req, res) => {
    let collection = await db.collection("scales");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });

// Update scale
router.patch("/scale/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const updates = {
      $push: { scales: req.body }
    };
    let collection = await db.collection("scales");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  });

  // Delete scale
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const collection = db.collection("scales");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  });