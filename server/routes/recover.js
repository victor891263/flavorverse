const express = require('express')
const router = express.Router()
const User = require("../models/user")
const crypto = require("crypto")
const sendEmail = require('../utilities/sendEmail')
const bcrypt = require("bcrypt")

// user specifies an email address to send password recovery instructions to
router.post('/', async (req, res) => {
    const email = req.body.email

    // check if the new username is already present in the database
    const user = await User.findOne({
        'newEmail.address': email
    })
    if (user) {
        res.status(404).send('No account exists with the provided email address')
        return
    }

    const recoveryId = crypto.randomBytes(32).toString('hex') // generate a 64-character long random string

    await User.findByIdAndUpdate(user.id, {
        recoveryId
    })

    // send the verification link to the user's email
    await sendEmail(email, recoveryId, 'password')

    res.sendStatus(200)
})

// user resets their password
router.put('/:id', async (req, res) => {
    const recoveryId = req.params.id
    const password = req.body.password

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // update the password
    const response = await User.findOneAndUpdate({
        recoveryId
    }, {
        password: hashedPassword,
        recoveryId: undefined
    })

    if (!response) {
        res.status(500).send('Unable to update password')
        return
    }

    res.sendStatus(200)
})

module.exports = router