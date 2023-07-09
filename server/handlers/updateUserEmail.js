const crypto = require("crypto")
const User = require("../models/user")
const sendEmail = require("../utilities/sendEmail")

module.exports = async (req, res) => {
    const newEmail = req.body.email
    const currentUserId = req.user.id

    console.log(newEmail)

    const verificationId = crypto.randomBytes(32).toString('hex') // generate a 64-character long random string

    // check if the new email is already taken. If it is, don't proceed
    const user = await User.exists({
        'newEmail.address': newEmail
    })
    if (user) {
        res.status(400).send('The provided email is already taken')
        return
    }

    // add the information to the user document that the user is trying to update their email, along with verification id for the email
    await User.findByIdAndUpdate(currentUserId, {
        newEmail: {
            address: newEmail,
            verificationId
        }
    })

    // send the verification link to the user's email
    await sendEmail(newEmail, verificationId, true)

    res.sendStatus(200)
}