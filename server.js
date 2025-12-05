const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected",()=>{
    console.log(`Connect to MongoDB ${mongoose.connection.name}`);
})

// Routes

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/pets/new',(req,res)=>{
    res.render('pets/new.ejs');
})

app.listen('3000', ()=>{
    console.log("Listening on port 3000")
} )