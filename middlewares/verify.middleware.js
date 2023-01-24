const checkLogin = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (req.isAuthenticated() || accessToken) {
    return next();
  } else {
    return res.redirect("/auth/login");
  }
};

module.exports = checkLogin;
