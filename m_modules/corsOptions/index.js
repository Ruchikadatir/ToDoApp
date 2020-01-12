const config = require('../../config/config')

module.exports = () => {
    const whitelist = config.CORS_WHITELIST || '*'
    const allowedHeaders = config.CORS_ALLOWEDHEADERS || ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token', 'Content-Range']

    const corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        preflightContinue: false,
        allowedHeaders: allowedHeaders,
    }
    return corsOptions
}
