const express = require("express");
const authRouter = require("./auth.router");
const homeRouter = require("./home.router");
const api = express.Router();

api.use("/home", homeRouter);
api.use("/auth", authRouter);
api.get("/*", (req, res) => {
  return res.send("your requrest is not defined in our system");
});
module.exports = api;
