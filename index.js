import mongoose from 'mongoose'
import Scale from './model/Scale'

mongoose.connect("mongodb+srv://jnqt:js03JmHarCj95VAq@all-music-is-microtonal.ullxm.mongodb.net/?retryWrites=true&w=majority&appName=all-music-is-microtonal")

// Create a new Scale post object
const scale = new Scale({
    scaleName: "FIRST SCALE!!!!!",
    author: "pluppy and juppy"
  });
  
  // Insert the article in our MongoDB database
  await scale.save();
  console.log(scale);