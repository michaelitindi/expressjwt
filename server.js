// Load env variables

if (process.env.NODE_ENV != "production"){

    require("dotenv").config();

}

// import dependancies
const express = require("express");
const connectToDb  = require("./config/connectToDb");
const Interview  = require("./models/interview");

// crete an express app
const app = express();

//configure express app 
app.use(express.json());

// connect to database
connectToDb();

// Routing
app.get("/", (req, res) => {
    res.send("App is running...")
});

app.get("/getinterviews", async (req, res) => {
    // find the interviews
  const interviews = await Interviews.find();
   //respond with them
   res.json({ interviews: interviews })
})

app.post("/submitinterview", async (req, res) => {
//get data of off req body
const title = req.body.title;
const description = req.body.description;
const questions = req.body.questions;

//create interview
const interview = await Interview.create({
    title: title,
    description: description,
    questions: questions,
});

//respond with interview
res.json({ interview: interview});

});

//start our server
app.listen(process.env.PORT);

