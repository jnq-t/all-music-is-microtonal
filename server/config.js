const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    endpoint: process.env.MONGODB_URI,
    port: process.env.PORT
  };