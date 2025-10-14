const express= require("express");

const router = express.Router();
const {logout }= require('../controllers/authcontroller');
const {isloggedin}=require("../middlewares/loggedin");

express.Router();

router.get("/",(req,res)=>{
  res.render("index");
});
router.get('/logout',isloggedin,logout);
router.get('/shop',isloggedin,async (req,res)=>{
        res.render("shop");
});
module.exports = router;
