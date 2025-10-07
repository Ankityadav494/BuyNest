const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("Owner Home Page");
});
if(process.env.NODE_ENV==='development'){

    router.post('/create',(req,res)=>{
        res.send("hi");
    });
};

module.exports=router;