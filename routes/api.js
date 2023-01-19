const express = require("express");
const checkLogin = require("../middlewares/verify.middleware");
const authRouter = require("./auth.router");
const homeRouter = require("./home.router");
const api = express.Router();

api.use("/home", checkLogin, homeRouter);
api.use("/auth", authRouter);
api.get("/", checkLogin, (req, res) => {
  return res.send("hello world");
});
api.get("*", (req, res) => {
  return res.redirect("/auth/error");
});

module.exports = api;
