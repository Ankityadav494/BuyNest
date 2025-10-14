const jwt=require("jsonwebtoken");
const usermodel= require("../models/user-model");
const isloggedin = async (req,res,next)=>{
    if(!req.cookies.token) {
        req.flash("You must be logged in ");
        res.redirect("/");
     
    }else{
    try{
        
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user = await usermodel.findOne({email:decoded.email}).select("-password");
        req.user=user;
        next();


    }
    catch(err){
        req.flash("something went wrong ");
        res.redirect("/");

    }
}
   

}
module.exports.isloggedin=isloggedin;