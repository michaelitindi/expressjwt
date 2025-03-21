const { default: mongoose } = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    interviewtitle: String,
    userid:String,
    score: String,
    comments: String,
});

const Evaluation = mongoose.model("Evaluation", Schema);

module.exports = Evaluation;