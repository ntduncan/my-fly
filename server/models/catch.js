
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catchSchema = new Schema({
    bait: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    fish: {
        type: [{species: {type: String, required: true}, length: {type: String, required: false}}],
        required: true,
    },
})

module.exports = mongoose.model('Catch', catchSchema);