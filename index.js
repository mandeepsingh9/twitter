const express=require("express");
require("dotenv").config();
const connect=require('./db.js')
const userRoute=require("./Router/userRoute.js");

const session = require('express-session');
const cors=require("cors");
const app=express();

connect();


app.use(session({
    secret: 'efeefffrrre333332',  
    resave: false,
    saveUninitialized: true
 }));

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

 app.use('/api',userRoute)


const port=process.env.PORT ||8080;
app.listen(port,()=>{
    console.log(`App is Listening ${port}`);
})