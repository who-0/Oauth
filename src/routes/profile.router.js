const express = require("express");
const profileRouter = express.Router();
const { httpGetProfile } = require("../controllers/profile.controller");

profileRouter.get("/", httpGetProfile);

module.exports = profileRouter;
