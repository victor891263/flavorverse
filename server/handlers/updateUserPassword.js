const User = require("../models/user")
const bcrypt = require("bcrypt")

module.exports = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const currentUserId = req.user.id

    // get the password from the database
    const user = await User.findById(currentUserId, 'password')

    // check if the given password matches with the one in the database. If it doesn't, don't proceed
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) {
        res.status(400).send('Wrong password')
        return
    }

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await user.save()

    res.sendStatus(200)
}