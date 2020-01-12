const Request = require('./Request')

module.exports = (req, res, next) => {
    const captureBody = req.session.captureBody || (process.env.CAPTURE_BODY === 'true')?true:false || false
    const _q = {
        headers: req.headers,
        url: req.url,
        method: req.method,
        sessionID: req.sessionID || null,
        body: (captureBody ? req.body : null),
        cookies: req.cookies,
        baseUrl: req.baseUrl,
        path: req.path,
        route: req.route,
        query: req.query,
        protocol: req.protocol,
        params: req.params,
        ip: req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null),
    }
    Request.create(_q)
    next()
}
