const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization // get jwt sent by client
    req.user = {} // empty object to prevent "cannot read id of undefined" errors

    // if a logged in user is present, decode the user's jwt and pass the decoded value onto the next middlewares
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            console.log('Failed to verify jwt', error)
        }
    }
    next()
}