const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const { endpoint } = require("./config")

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
})
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
}

module.exports = connectDB;