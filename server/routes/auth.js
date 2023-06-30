const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const authData = req.body // username and password that the guest gave

    // check if the given email exists in the database. If it doesn't, don't proceed
    const user = await User.findOne({
        email: {
            address: authData.email
        }
    })
    if (!user) {
        res.status(400).send('Invalid email or password')
        return
    }

    // check if the given password matches with the one in the database. If it doesn't, don't proceed
    const isPasswordValid = await bcrypt.compare(authData.password, user.password)
    if (!isPasswordValid) {
        res.status(400).send('Invalid email or password')
        return
    }

    // create the json web token
    const token = jwt.sign({
        id: user.id,
        isVerified: !user.email.verificationId // if verification id still exists, that means the user is unverified
    }, process.env.JWT_SECRET)

    // send the json web token to the client
    res.send(token)
})

module.exports = router