const express = require("express");
const checkLogin = require("../middlewares/verify.middleware");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");
const api = express.Router();

api.use("/profile", checkLogin, profileRouter);
api.use("/auth", authRouter);
api.get("/", checkLogin, async (req, res) => {
  return res.render("home");
});
api.get("/cookie", (req, res) => {
  return res.render("cookie");
});
api.get("/privacy", (req, res) => {
  return res.render("privacy");
});
api.get("*", (req, res) => {
  return res.redirect("/auth/error");
});

module.exports = api;
