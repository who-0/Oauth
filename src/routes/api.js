const express = require("express");
const checkLogin = require("../middlewares/verify.middleware");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");
const indexRouter = require("./home.router");
const api = express.Router();

api.use(indexRouter);
api.use("/auth", authRouter);
api.use("/profile", checkLogin, profileRouter);
api.get("*", (req, res) => res.redirect("/auth/error"));

module.exports = api;
