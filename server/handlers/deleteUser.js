const User = require("../models/user")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    await User.findByIdAndDelete(currentUserId)

    res.sendStatus(200)
}