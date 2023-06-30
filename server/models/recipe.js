const mongoose = require('mongoose')
const Review = require('./review')

const Recipe = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    desc: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    tags: [{
        type: String,
        min: 1,
        max: 50
    }],
    nutrition: [{
        label: {
            type: String,
            required: true,
            min: 1,
            max: 50
        },
        value: {
            type: String,
            required: true,
            min: 1,
            max: 20
        }
    }],
    servings: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
            min: 1,
            max: 50
        },
        quantity: {
            type: String,
            required: true,
            min: 1,
            max: 20
        }
    }],
    duration: { // required is not needed for any because some dishes dont have prep time while some dishes dont have cook time
        prep: {
            type: Number,
            min: 1,
            max: 3000 // this represents a number slightly higher than the number of minutes in two days, or 48 hours
        },
        cook: {
            type: Number,
            min: 1,
            max: 3000 // this represents a number slightly higher than the number of minutes in two days, or 48 hours
        },
        extra: {
            type: Number,
            min: 1,
            max: 3000 // this represents a number slightly higher than the number of minutes in two days, or 48 hours
        }
    },
    steps: [{
        type: String,
        min: 1,
        max: 300
    }],
    reviews: [Review]
}, { timestamps: true })

module.exports = mongoose.model('Recipe', Recipe)