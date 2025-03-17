// Load env variables

if (process.env.NODE_ENV != "production"){

    require("dotenv").config();

}

// import dependancies
const express = require("express");
const connectToDb  = require("./config/connectToDb");
const Interview  = require("./models/interview");
const usersController = require("./controllers/usersController");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");


// crete an express app
const app = express();

//configure express app 
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());


// connect to database
connectToDb();

// Routing
app.get("/", (req, res) => {
    res.send("Api is running...")
});
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/getinterviews", async (req, res) => {
    // find the interviews
  const interviews = await Interviews.find();
   //respond with them
   res.json({ interviews: interviews })
})

app.get("/getinterviews/:id", async (req, res) => {
    //get id of url 
    const interviewId = req.params.id;
    //find the interview using that id
    const interview = await Interview.findById(interviewId);
    //respond with the interview
    res.json({})
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

