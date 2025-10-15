const express= require("express");

const router = express.Router();
const {logout }= require('../controllers/authcontroller');
const {isloggedin}=require("../middlewares/loggedin");

express.Router();

router.get("/",(req,res)=>{
  res.render("index");
});
router.get('/logout',logout);
router.get('/shop',async (req,res)=>{
        res.render("shop");
});
module.exports = router;
