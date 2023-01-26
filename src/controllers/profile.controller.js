const { findById } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const Cookie_R = process.env.COOKIE_KEY_R;
const httpGetProfile = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let id;
    if (refreshToken) {
      id = jwt.verify(refreshToken, Cookie_R).id;
    } else {
      id = req.user;
    }
    const e_user = await findById(id);
    console.log(e_user);
    return res.render("profile", { user: e_user });
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: "Plase Try again later. Our system is missing something.",
    });
  }
};
module.exports = { httpGetProfile };
