const User = require("../models/user")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendEmail = require("../utilities/sendEmail")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
    const userData = req.body

    // check if the email provided by the guest is already present in the database. If it is, don't proceed
    const user = await User.findOne({
        email: {
            address: userData.email
        }
    })

    if (user) {
        res.status(400).send('An account with a given email already exists')
        return
    }

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const verificationId = crypto.randomBytes(32).toString('hex') // generate a 64-character long random string

    const result = await User.create({
        username: userData.email,
        email: {
            address: userData.email,
            verificationId
        },
        password: hashedPassword
    })

    // send an email to the email address provided by the user
    await sendEmail(userData.email, verificationId, 'account')

    // create the json web token and send it to the client
    const token = jwt.sign({
        _id: result.id,
        isVerified: false // new users are always unverified
    }, process.env.JWT_SECRET)
    res.send(token)
}