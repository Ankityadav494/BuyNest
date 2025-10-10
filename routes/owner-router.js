const express=require('express');
const bcrypt=require('bcrypt');

const router=express.Router();
const ownermodel=require('../models/owner-model');

router.get('/',(req,res)=>{
    res.send("Owner Home Page");
});

if(process.env.NODE_ENV!=='production'){

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