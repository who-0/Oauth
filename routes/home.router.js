const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  return res.send("home router");
});
homeRouter.get("/test", (req, res) => {
  return res.send("index page");
});
module.exports = homeRouter;
