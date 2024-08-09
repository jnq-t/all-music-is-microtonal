const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jnqt:js03JmHarCj95VAq@all-music-is-microtonal.ullxm.mongodb.net/?retryWrites=true&w=majority&appName=all-music-is-microtonal";

// Load Scale Model
const Scale = require('./model/Scale')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
       version: ServerApiVersion.v1,
       strict: true,
       deprecationErrors: true,
   }
});

async function run() {
   try {
       // Connect the client to the server (optional starting in v4.7)
       await client.connect();
       // Send a ping to confirm a successful connection
       await client.db("admin").command({ ping: 1 });
       console.log("Pinged your deployment. You successfully connected to MongoDB!");
       // make scale
       const dbName = "all-music-is-microtonal";
       const collectionName = "scales";


       // Create references to the database and collection in order to run
       // operations on them.
       const database = client.db(dbName);
       const collection = database.collection(collectionName);
       // console.log(database)
       // console.log(collection)


       const findOneQuery = { name: "test2" };

       try {
         const findOneResult = await collection.findOne(findOneQuery);
         if (findOneResult === null) {
           console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
         } else {
           console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
         }
       } catch (err) {
         console.error(`Something went wrong trying to find one document: ${err}\n`);
       }


     
   } finally {
       // Ensures that the client will close when you finish/error
       await client.close();
   }
}
run().catch(console.dir);