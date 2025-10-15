const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    discount:Number,
    bgcolor:String,
    textcolor:String,
    panelcolor:String,});

    module.exports=mongoose.model('products',productSchema);

