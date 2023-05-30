module.exports = (error, req, res, next) => {
    if (error) {
        const statusCode = (res.statusCode < 400) ? 500 : res.statusCode
        res.status(statusCode).send(error.message || 'Unknown error occurred on server')
    }
    next()
}