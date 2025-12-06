const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {type: String, required: true },
    species: {type: String, required: true},
    size: {type: String, required: true},
    isReadyForAdoption: Boolean,
    gender: {type: String,require: true},
    location: {type: String, require: true},
    contact:{type: String,require},
    breed: String,
    age: Number,
    description: String,
    imageUrl: String,
})

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
