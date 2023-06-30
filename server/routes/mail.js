const express = require('express')
const router = express.Router()
const User = require('../models/user')
const handleAccess = require('../middleware/handleAccess')

router.get('/:id', handleAccess, async (req, res) => {
    const verificationId = req.params.id
    const currentUserId = req.user.id

    // find the user with the currently logged in info and the verification id
    const user = await User.findOne({
        _id: currentUserId,
        newEmail: {
            verificationId
        }
    }, 'newEmail')

    if (!user) {
        res.status(400).send('The verification id is invalid')
        return
    }

    // change the user's email to the new email
    user.email.address = user.newEmail.address

    // after updating email, empty the new email property
    user.newEmail.address = null
    user.newEmail.verificationId = null

    // save the changes
    user.save()
})

module.exports = router