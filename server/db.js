const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const { endpoint } = require("./config")

//test: add scale model and see if this fixes connection issues
const ScaleScheme = require('../app/models/Scale')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(endpoint, {
   serverApi: {
       version: ServerApiVersion.v1,
       strict: true,
       deprecationErrors: true,
   }
});

async function connectDB() {
await mongoose.connect(endpoint)
  .then(() => {
    console.log('MongoDB connected successfully via Mongoose')

    const dbName = "all-music-is-microtonal";
    const collectionName = "scales";
  
    // Create references to the database and collection in order to connectDB
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    console.log(collection)
})
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
}

module.exports = connectDB;