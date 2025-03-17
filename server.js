// Load env variables

if (process.env.NODE_ENV != "production"){

    require("dotenv").config();

}

// import dependancies
const express = require("express");
const connectToDb  = require("./config/connectToDb")

// crete an express app
const app = express();

// connect to database
connectToDb();

// Routing

//start our server
app.listen(process.env.PORT);

