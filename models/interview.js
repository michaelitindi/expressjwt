const { default: mongoose } = require("mongoose");

const interviewSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: String,
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;