const express = require('express');
const app = express();
const ejs=require('ejs');

require('dotenv').config({ quiet: true });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require('./config/mongoose-connect');
const productSchema = require('./models/product-model');
const userSchema = require('./models/user-model');
const ownerSchema = require('./models/owner-model');

const ownerRouter = require('./routes/owner-router');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productsRouter');


app.set('view engine','ejs');

app.use("/owner",ownerRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);

app.listen(3000);