const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization // get jwt sent by client
    req.user = {} // empty object to prevent "cannot read id of undefined" errors

    // if a logged in user is present, decode the user's jwt and pass the decoded value onto the next middlewares
    if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET) // extract user info
        user.id = user._id

        // check if the user with the provided id exists in the database. If it doesn't, don't proceed
        const isExist = await User.exists({
            _id: user.id
        })
        if (!isExist) {
            res.status(404).send(`Access denied as we can't find your profile in our database`)
            return
        }

        // check if user is verified. If they are, pass the user info onto the next middleware
        const response = await User.findById(user.id, 'email')
        if (!response.email.verificationId) req.user = user
    }

    next()
}