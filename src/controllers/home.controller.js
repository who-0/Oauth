const { findById } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { COOKIE_KEY_1 } = process.env;
const httpGetHome = async (req, res) => {
  let id;
  const { accessToken } = req.cookies;
  if (accessToken) {
    id = jwt.verify(accessToken, COOKIE_KEY_1).id;
  } else {
    id = req.user;
  }
  const user = await findById(id);
  res.render("pages/home", { title: "Home", username: user.username });
};
const httpCookie = (req, res) => res.render("pages/cookie");
const httpPrivacy = (req, res) => res.render("pages/privacy");

module.exports = {
  httpGetHome,
  httpCookie,
  httpPrivacy,
};
