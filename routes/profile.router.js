const express = require("express");
const profileRouter = express.Router();
const { findById } = require("../models/users.model");
const { httpGetProfile } = require("../controllers/profile.controller");

profileRouter.get("/", httpGetProfile);
module.exports = profileRouter;
