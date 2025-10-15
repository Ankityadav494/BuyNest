const express=require('express');
const bcrypt=require('bcrypt');

const router=express.Router();
const ownermodel=require('../models/owner-model');
const upload =require('../middlewares/upload');
const productmodel=require("../models/product-model");
const { text } = require('body-parser');

router.get('/admin',(req,res)=>{
    res.render("admin");
});
router.post('/add',upload.single("image"),async (req,res)=>{
    let{name,price,discount,bgcolor,textcolor,panelcolor}=req.body;
    let product=await productmodel.create({
        image:req.file.buffer,
        name,price,discount,bgcolor,panelcolor,textcolor
    });
    res.redirect("/shop");

});

if(process.env.NODE_ENV!=='development'){

    router.post('/create',async (req,res)=>{
        const {name,email,phone,password}=req.body;
       const  existingowner=ownermodel.findOne({email:req.body.email});
       if(existingowner){
        return res.status(400).json({message:"Owner already exists"});
       }
         const newowner = await ownermodel.create({
            name,
            email,
            phone,
            password,
         });
        console.log(newowner);
        return res.status(200).json({message:"Owner created successfully",owner:`${newowner}`});
    });
};

module.exports=router;