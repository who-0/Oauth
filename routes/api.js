const express = require("express");
const checkLogin = require("../middlewares/verify.middleware");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");
const api = express.Router();

api.use("/profile", checkLogin, profileRouter);
api.use("/auth", authRouter);
api.get("/", checkLogin, async (req, res) => {
  // console.log(req.user);
  // return res.json(200).json(req.user);
  return res.render("home");
});
api.get("*", (req, res) => {
  return res.redirect("/auth/error");
});

module.exports = api;
