const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require("method-override");
const morgan = require('morgan');
const path = require("path");

dotenv.config();

const Pet = require('./models/pet')
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

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

app.post('/pets', async(req,res)=>{
    if(req.body.isReadyForAdoption==="on"){
        req.body.isReadyForAdoption = true;
    }else{
        req.body.isReadyForAdoption = false;
    }

    await Pet.create(req.body);
    res.redirect('/pets');
})

app.get('/pets', async(req,res)=>{
    const allPets = await Pet.find()
    res.render('pets/index.ejs', {allPets:allPets});
})

app.get('/pets/:petsId', async(req, res)=>{
    const foundPet = await Pet.findById(req.params.petsId);
    res.render('pets/show.ejs', {pet: foundPet});
})


app.get('/pets/:petsId/edit', async(req,res)=>{
    const foundPet = await Pet.findById(req.params.petsId);
    res.render('pets/edit.ejs',{pet:foundPet});
})

app.put('/pets/:petsId',async(req,res)=>{
    if (req.body.isReadyForAdoption === "on") {
    req.body.isReadyForAdoption = true;
  } else {
    req.body.isReadyForAdoption = false;
  }
  
  await Pet.findByIdAndUpdate(req.params.petsId, req.body);
  res.redirect(`/pets/${req.params.petsId}`);

})

app.delete('/pets/:petsId', async(req, res)=>{
    const foundPet = await Pet.findOneAndDelete(req.params.petsId);
    res.redirect('/pets');
})


app.listen('3000', ()=>{
    console.log("Listening on port 3000")
} )



