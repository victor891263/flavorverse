const User = require("../models/user")

module.exports = async (req, res, next) => {
    // if no user is logged in, don't proceed
    if (!req.user.id) {
        res.status(400).send(`You don't have permission to do this`)
        return
    }

    // check if the user with the provided id exists in the database. If it doesn't, don't proceed
    const isExist = await User.exists({
        _id: req.user.id
    })

    if (!isExist) {
        res.status(404).send(`Access denied as we can't find your profile in our database`)
        return
    }

    next()
}