const express = require('express');
const app = express();
const flash = require("connect-flash");
const expressSession = require("express-session")
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const ejs=require('ejs');
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
const db = require('./config/mongoose-connect');

const ownerRouter = require('./routes/owner-router');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');

require('dotenv').config({ quiet: true });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(express.static('public'));

app.set('view engine','ejs');

app.use("/", indexRouter);
app.use("/owner",ownerRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);


app.use((req, res, next) => {
  res.status(404).send('Page not found');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
