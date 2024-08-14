const connectDB = require('./db');
//Express Node Intro: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
//Express simplifies APIs and handeling of HTTP request/response 
const express = require('express');
const routes = require('../routeTest')
const app = express();

const { port } = require('./config');


// Connect Database
connectDB().catch(console.dir);

// allows for post 'req.body.propertyName' to work
app.use(express.json())
// use exported routes
app.use('/api', routes)

// Connect to localhost port
app.get('/', (req, res) => res.send('Hello world!'));
app.listen(port, () => console.log(`Server running on port ${port}`));
