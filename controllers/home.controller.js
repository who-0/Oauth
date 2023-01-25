const httpGetHome = (req, res) => res.render("home");
const httpCookie = (req, res) => res.render("cookie");
const httpPrivacy = (req, res) => res.render("privacy");

module.exports = {
  httpGetHome,
  httpCookie,
  httpPrivacy,
};
