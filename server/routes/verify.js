const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const handleAccess = require('../middleware/handleAccess')
const User = require('../models/user')

router.get('/:id', handleAccess, async (req, res) => {
    const verificationId = req.params.id
    const token = req.headers.authorization // get jwt sent by client

    // if no jwt is found, don't proceed
    if (!token) {
        res.status(400).send('No user credentials (token) seems to be found')
        return
    }

    const userInfo = jwt.verify(token, process.env.JWT_SECRET) // extract user info

    // if no user with the given verification id is found, return an error the the client
    const user = await User.findOne({
        _id: userInfo.id,
        email: {
            verificationId
        }
    })
    if (!user) {
        res.status(400).send('The verification link appears to be invalid')
        return
    }

    // remove the verification id
    user.email.verificationId = null
    user.save()

    res.sendStatus(200)
})

module.exports = router