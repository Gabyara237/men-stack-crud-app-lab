const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: Number,
    breed: String,
    size: String,
    description: String,
    isReadyForAdoption: Boolean
})

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
