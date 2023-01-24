const { findById } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const Cookie_R = process.env.COOKIE_KEY_R;
const httpGetProfile = async (req, res) => {
  const { refreshToken } = req.cookies;
  let id;
  if (refreshToken) {
    id = jwt.verify(refreshToken, Cookie_R).id;
  } else {
    id = req.user;
  }
  const e_user = await findById(id);
  return res.render("profile", { user: e_user });
};
module.exports = { httpGetProfile };
