const User = require("../models/user")

module.exports = async (req, res, next) => {
    // if no user is logged in, don't proceed
    if (!req.user.id) {
        res.status(400).send(`You don't have permission to do this`)
        return
    }

    next()
}