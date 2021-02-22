const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
cachegoose(mongoose);
const Schema = mongoose.Schema;


const Movies = new Schema({
    title: {type:String, unique: true},
    year: Number,
    genre: String,
    description: String,
    image_url: String,
    trailer_video: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
});

module.exports = mongoose.model('Movies', Movies);