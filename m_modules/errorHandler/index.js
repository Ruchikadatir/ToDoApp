const constants = require('../../constants')

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.error(err)
    res.status(err.code || constants.HTTP_500).json({success: false, error: true, message: err.message || ''})
}
