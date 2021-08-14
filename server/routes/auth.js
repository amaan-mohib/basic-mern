const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.status(400).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.status(400).send("User already exists");
    }
    if (!doc) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashedPass,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  delete req.user;
  res.send("logged out");
});

module.exports = router;
