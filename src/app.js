const path = require("path");
const express = require("express");
const bdparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const google = require("./config/google.passport");
const github = require("./config/github.passport");

//!---middleware---

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(bdparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  cors({ origin: "https://oauth-h3cg.onrender.com", methods: ["get", "post"] })
);
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookie());
google(passport);
github(passport);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_KEY_1,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      // "script-src": ["'self'", "'unsafe-inline'", "googleusercontent.com"],
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(api);

module.exports = app;
