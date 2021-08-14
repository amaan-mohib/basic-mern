const mongoose = require("mongoose");

const user = new mongoose.Schema({
  displayName: String,
  email: String,
  userid: String,
});

const comment = new mongoose.Schema({
  postid: String,
  author: user,
  comment: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comments", comment);
