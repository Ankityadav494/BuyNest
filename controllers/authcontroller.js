const generatetoken = require('../utils/jwtgenerator');
const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');

const userregister = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    let existinguser = await usermodel.findOne({ email });
    if (existinguser) return res.status(400).send("You already have an account... please login!");

    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

let  newuser = await usermodel.create({
      fullname,
      email,
      password: hash,
      phone,
    });

    res.status(200).send({ message: "User registered successfully", user: newuser });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;


    let  user = await usermodel.findOne({ email:email });
    if (!user) return res.status(400).send("User not found");

   
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send("Error comparing passwords");

      if (result) {
        const token = generatetoken(user);
        res.cookie("token", token);
        res.status(200).send("Login successful");
      } else {
        res.status(400).send("Incorrect password");
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

     

module.exports.userregister = userregister;
module.exports.loginuser=loginuser;
