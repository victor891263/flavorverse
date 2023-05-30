const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 30
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        min: 1,
        max: 50
    },
    about: {
        type: String,
        min: 1,
        max: 300
    }
}, { timestamps: true })

module.exports = mongoose.model('User', User)