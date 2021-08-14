const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) throw err;
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          bcrypt.compare(password, user.password, (err, res) => {
            if (err) throw err;
            if (res === true) {
              return done(null, user);
            } else return done(null, false);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
