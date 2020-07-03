// 🚀 starting.. 

// read local env vars
require('dotenv').config();

// set up development env var if not assigned (by heroku)
process.env.NODE_ENV = process.env.NODE_ENV
   ? process.env.NODE_ENV
   : 'development'

// run server 
require("./server.js");