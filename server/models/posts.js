const mongoose = require("mongoose");

const user = new mongoose.Schema({
  displayName: String,
  email: String,
  userid: String,
});

const posts = new mongoose.Schema({
  topic: String,
  desc: String,
  author: user,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Posts", posts);
