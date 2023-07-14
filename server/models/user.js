const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: {
        address: {
            type: String,
            required: true,
            unique: true,
            min: 1,
            max: 30,
            validate: {
                validator: function(value) {
                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return regex.test(value)
                },
                message: props => `${props.value} is not a valid email address`
            }
        },
        verificationId: {
            type: String,
            min: 1,
            max: 100
        }
    },
    newEmail: {
        address: {
            type: String,
            unique: true,
            min: 1,
            max: 30,
            default: null,
            validate: {
                validator: function(value) {
                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return regex.test(value)
                },
                message: props => `${props.value} is not a valid email address`
            }
        },
        verificationId: {
            type: String,
            min: 1,
            max: 100,
            default: null
        }
    },
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
        max: 1000
    },
    img: {
        type: String,
        min: 1,
        max: 300
    },
    link: {
        type: String,
        min: 1,
        max: 100
    },
    recoveryId: {
        type: String,
        min: 1,
        max: 100
    }
}, { timestamps: true })

module.exports = mongoose.model('User', User)