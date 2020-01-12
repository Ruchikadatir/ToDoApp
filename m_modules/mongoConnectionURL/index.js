const config = require('../../config/config')

module.exports = () => {
    // Set up mongoose connection
    const MONGO_USER = process.env.MONGO_USER || config.MONGO_USER || null
    const MONGO_PWD = process.env.MONGO_PWD || config.MONGO_PWD || null
    let MONGO_CREDENTIALS = null
    if (MONGO_USER && MONGO_PWD) {
        const MONGO_USER_ENCODED = encodeURIComponent(MONGO_USER)
        const MONGO_PWD_ENCODED = encodeURIComponent(MONGO_PWD)
        MONGO_CREDENTIALS = `${MONGO_USER_ENCODED}:${MONGO_PWD_ENCODED}`
    }
    let MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : config.MONGO_URL
    if (MONGO_CREDENTIALS) {
        MONGO_URL = `${MONGO_URL.split('://')[0]}://${MONGO_CREDENTIALS}@${MONGO_URL.split('://')[1]}`
    }
    const MONGO_DB = process.env.MONGO_DB ? process.env.MONGO_DB : config.MONGO_DB
    const MONGO_OPTIONS = process.env.MONGO_OPTIONS ? process.env.MONGO_OPTIONS : config.MONGO_OPTIONS
    MONGO_URL = MONGO_URL + MONGO_DB + MONGO_OPTIONS
    console.log(MONGO_URL)
    return MONGO_URL
}
