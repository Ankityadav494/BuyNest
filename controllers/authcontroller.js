const generatetoken = require('../utils/jwtgenerator');
const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');

// Cookie options for JWT token (secure, httpOnly)
const getCookieOptions = () => ({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true,               // Prevents XSS - JS cannot access cookie
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
  sameSite: 'lax',              // CSRF protection
});

const userregister = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    let existinguser = await usermodel.findOne({ email });
    if (existinguser) return res.status(400).send("You already have an account... please login!");

    if (!password) return res.status(400).send("Password is required");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let newuser = await usermodel.create({
      fullname,
      email,
      password: hash,
      phone,
    });

    const token = generatetoken(newuser);
    res.cookie("token", token, getCookieOptions());
    res.redirect("/shop");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await usermodel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(400).send("Incorrect password");

    const token = generatetoken(user);
    res.cookie("token", token, getCookieOptions());
    res.redirect("/shop");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
     

module.exports.userregister = userregister;
module.exports.loginuser=loginuser;
module.exports.logout=logout;
