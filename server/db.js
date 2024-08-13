const { MongoClient, ServerApiVersion } = require('mongodb');
const { endpoint } = require("./config")

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//FIX: inputting "endpoint", which is the same string currenty in MongoClient() causes an error when executing 'npm run dev' in terminal. Fix this so we can use our .env and config setup.
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
       // operations on them.
       const database = client.db(dbName);
       const collection = database.collection(collectionName);
   } finally {
       // Ensures that the client will close when you finish/error
       await client.close();
   }
}

module.exports = connectDB;