const express = require("express");
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const router = express.Router();

router.post("/", (req, res) => {
  const newPost = new Posts({
    topic: req.body.topic,
    desc: req.body.desc,
    author: {
      displayName: req.body.author.displayName,
      email: req.body.author.email,
      userid: req.body.author.userid,
    },
  });
  newPost.save();
  res.send("Post created");
});

router.get("/list", (req, res) => {
  Posts.find({}, null, { sort: { date: -1 } }, (err, docs) => {
    if (err) throw err;
    res.send(docs);
  });
});

router.get("/discussion/:id", (req, res) => {
  Posts.findById(req.params.id, (err, doc) => {
    if (err) throw err;
    res.send(doc);
  });
});

router.get("/discussion/comment/:id", (req, res) => {
  Comments.find(
    { postid: req.params.id },
    null,
    { sort: { date: -1 } },
    (err, docs) => {
      if (err) throw err;
      res.send(docs);
    }
  );
});

router.post("/discussion/comment", (req, res) => {
  const newComment = new Comments({
    postid: req.body.postid,
    comment: req.body.comment,
    author: {
      displayName: req.body.author.displayName,
      email: req.body.author.email,
      userid: req.body.author.userid,
    },
  });
  newComment.save();
  res.send("Comment created");
});

router.delete("/delete/:id", (req, res) => {
  Posts.findByIdAndDelete(req.params.id, async (err, doc) => {
    if (err) throw err;
    await Comments.deleteMany({ postid: req.params.id });
    res.send(doc);
  });
});

module.exports = router;
