const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reviews = new Schema({
    
    reviewTitle: String,
    reviewContent: String,
    rating: Number,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    movies:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        }
    ,
    users:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }

});

module.exports = mongoose.model('Reviews', Reviews);