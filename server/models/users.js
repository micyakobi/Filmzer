const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    username: {
        type: String,
        index: { unique: true }
    },
    password: String,
    admin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
});



module.exports = mongoose.model('Users', Users);