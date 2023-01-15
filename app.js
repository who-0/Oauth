const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const google = require("./config/passport");

//!---middleware---

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(api);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: 24 * 60 * 60 * 1000,
    secret: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());
google(passport);

module.exports = app;
