const express = require("express");
const profileRouter = express.Router();
const { findById } = require("../models/users.model");

profileRouter.get("/", async (req, res) => {
  const e_user = await findById(req.user);
  return res.render("profile", { user: e_user });
});

module.exports = profileRouter;
