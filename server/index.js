const { MongoClient, ServerApiVersion } = require('mongodb');
// Not Working ... figure out how to add uri via dotenv file for MongoClient
const {endpoint} = require("./config") 


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//FIX: inputting "endpoint", which is the same string currenty in MongoClient() causes an error when executing 'npm run dev' in terminal. Fix this so we can use our .env and config setup.
const client = new MongoClient("mongodb+srv://jnqt:js03JmHarCj95VAq@all-music-is-microtonal.ullxm.mongodb.net/?retryWrites=true&w=majority&appName=all-music-is-microtonal", {
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

    console.log(endpoint)
       // Create references to the database and collection in order to run
       // operations on them.
       const database = client.db(dbName);
       const collection = database.collection(collectionName);
       // console.log(database)
       // console.log(collection)


       const findOneQuery = { name: "test2" };

       try {
          console.log("endpoint is",endpoint)
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