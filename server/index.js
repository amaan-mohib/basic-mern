const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 4000;
const uri =
  "mongodb+srv://admin:tdIz74cRAsdvt62z@cluster0.x1ntx.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

const auth = require("./routes/auth");
const post = require("./routes/post");
app.use("/api", auth);
app.use("/api/post", post);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
