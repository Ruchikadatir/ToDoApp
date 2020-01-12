/* eslint-disable require-jsdoc */
class ResponseError extends Error {
    constructor(code = 500, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError)
        }

        this.name = 'ResponseError'
        // Custom debugging information
        this.code = code
        this.date = new Date()
    }
}
module.exports = ResponseError
