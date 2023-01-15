const express = require("express");
const { model } = require("mongoose");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  return res.send("home router");
});

module.exports = homeRouter;
