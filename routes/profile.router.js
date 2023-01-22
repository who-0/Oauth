const express = require("express");
const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  return res.render("profile");
});

module.exports = profileRouter;
