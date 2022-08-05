const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: [true, "Movie Name is Required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is Required"]
    },
    cast: {
        type: Array,
        required: [true, "Cast is Required"]
    },
    genre: {
        type: String,
        required: [true, "Genre is Required"]
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    }  
}, { timestamps: true })

module.exports = mongoose.model("Movies", movieSchema);