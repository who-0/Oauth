const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const api = require("./routes/api");
require("./config/passport")(passport);

//!---middleware---

app.set("view engine", "ejs");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_KEY_1,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(api);

module.exports = app;
