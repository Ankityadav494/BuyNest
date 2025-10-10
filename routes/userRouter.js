const express = require('express');
const router = express.Router();
const {loginuser, userregister }= require('../controllers/authcontroller');
const {isloggedin}=require("../middlewares/loggedin");


router.get('/', (req, res) => {
        res.send("user home page ");
});
router.post('/register', userregister);
router.post('/login',loginuser);
router.get('/shop',isloggedin,(req,res)=>{
        res.send("on shop page and you are logged in ");
});
module.exports = router;