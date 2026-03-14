const jwt = require("jsonwebtoken");
const usermodel = require("../models/user-model");

const JWT_KEY = process.env.JWT_KEY || "dev-secret-key-change-in-production";

const isloggedin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "You must be logged in");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const user = await usermodel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      res.clearCookie("token");
      req.flash("error", "User not found");
      return res.redirect("/");
    }
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    req.flash("error", "Session expired. Please login again.");
    return res.redirect("/");
  }
};

module.exports.isloggedin = isloggedin;