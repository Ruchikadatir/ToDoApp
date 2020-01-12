const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser')
const uuidv4 = require('uuid/v4')
const cors = require('cors')
const app = express()
// others
const config = require('./config/config')
require('./database/connect')
// Environment first, config next, else default
const port = process.env.PORT || config.PORT || 5000
const basePath = config.API_BASE_PATH || '/'
// routers
const healthRouter = require('./router/health')
const todoRouter = require('./router/to-do')
const bucketRouter = require('./router/bucket')
const requestLogger = require('./m_modules/requestLogger')
const MONGO_URL = require('./m_modules/mongoConnectionURL')()
const corsOptions = require('./m_modules/corsOptions')()
const errorHandler = require('./m_modules/errorHandler')
const responseHandler = require('./m_modules/responseHandler')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
// Cookie Parser
app.use(cookieParser())
// Use session
// Use Mongo Store for Session data storage
const store = new MongoStore({
    url: MONGO_URL,
    ttl: 3600,
    autoRemove: 'native', // Default
})
//  EXPRESS-SESSION && MONGOSTORE
//  MongoDB session store for Express and Connect
//  Simple session middleware for Express
const _session = {
    key: config.COOKIE_NAME,
    name: config.COOKIE_NAME,
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        path: config.COOKIE_PATH,
        maxAge: config.COOKIE_AGE,
        httpOnly: true,
        domain: config.COOKIE_DOMAIN,
    },
    genid: function() {
        return uuidv4() // use UUIDs for session IDs
    },
}
app.use(session(_session))
//  session management
session.Session.prototype.login = (req, user, cb) => {
    try {
        req.session.userInfo = user
        req.session.user = user.email
        cb()
    } catch (error) {
        cb(error)
    }
}
// View Engine to pug
// app.set('view engine', 'pug')
app.use((req, res, next) => {
    req.response = {}
    next()
})
// Request Logger
app.use(requestLogger)
// cors
const checkCORS = config.CORS_ENABLED || false
const routers = [{
    path: '/healthz',
    router: healthRouter,
}, {
    path: '/v1',
    router: todoRouter,
}, {
    path: '/v1/bucket',
    router: bucketRouter,
}]

routers.forEach((route) => {
    const _path = `${basePath}${route.path}`
    checkCORS ? app.use(_path, cors(corsOptions), route.router) : app.use(_path, route.router)
})
// Response handler
app.use(responseHandler)
// Error handler
app.use(errorHandler)
// Start the express app
app.listen(port, () => console.log(`${basePath} service is now listening on port ${port}!`))
