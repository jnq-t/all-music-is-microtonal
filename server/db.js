const { MongoClient, ServerApiVersion } = require('mongodb');
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
   try {
       // Connect the client to the server (optional starting in v4.7)
       await client.connect();
       // Send a ping to confirm a successful connection
       await client.db("admin").command({ ping: 1 });
       console.log("Pinged your deployment. You successfully connected to MongoDB!");

       const dbName = "all-music-is-microtonal";
       const collectionName = "scales";
     
       // Create references to the database and collection in order to connectDB
       const database = client.db(dbName);
       const collection = database.collection(collectionName);
   } finally {
       // Ensures that the client will close when you finish/error
       await client.close();
   }
}

module.exports = connectDB;