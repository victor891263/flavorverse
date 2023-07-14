const User = require("../models/user")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    await User.findByIdAndUpdate(currentUserId, {
        newEmail: {
            address: undefined,
            verificationId: undefined
        }
    })

    res.sendStatus(200)
}