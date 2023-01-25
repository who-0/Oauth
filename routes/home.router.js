const express = require("express");
const indexRouter = express.Router();
const checkLogin = require("../middlewares/verify.middleware");
const {
  httpGetHome,
  httpCookie,
  httpPrivacy,
} = require("../controllers/home.controller");

indexRouter.get("/", checkLogin, httpGetHome);
indexRouter.get("/cookie", httpCookie);
indexRouter.get("/privacy", httpPrivacy);

module.exports = indexRouter;
