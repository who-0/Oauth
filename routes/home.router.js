const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  console.log("user", req.user);
  return res.send("home router");
});

module.exports = homeRouter;
