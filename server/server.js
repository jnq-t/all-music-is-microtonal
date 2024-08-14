const connectDB = require('./db');
//Express Node Intro: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
const express = require('express');
const scaleRoute = require("./routes/scale");
const app = express();

const { port } = require('./config');


// Connect Database
connectDB().catch(console.dir);

// Connect to localhost port
app.get('/', (req, res) => res.send('Hello world!'));
app.listen(port, () => console.log(`Server running on port ${port}`));

app.use("/scales", scaleRoute);