const express = require("express");
const router = express.Router();
const { logout } = require("../controllers/authcontroller");
const { isloggedin } = require("../middlewares/loggedin");

router.get("/", (req, res) => {
  res.render("index", { message: req.flash("error") });
});

router.get("/logout", logout);

router.get("/shop", isloggedin, (req, res) => {
  res.render("shop", { user: req.user });
});
module.exports = router;
