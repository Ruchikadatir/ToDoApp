const ToDo = require('../models/to-do')

// Error Object
const Error = require('../m_modules/errorHandler/index.js')

module.exports.get = () => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 200,
            message: 'Alive \'n Kickin',
            data: {},
        })
    })
}

module.exports.create = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const todo = new ToDo(req.body)
        todo.save( (err, obj) => {
            if (err) reject(Error.MongoError(err))

            // Success Message Payload
            const response = {}
            response.statusCode = 200
            response.message = 'TO DO Added'
            response.data = obj

            console.log('Response', response)
            resolve(response)
        })
    })
}

module.exports.fetch = (req, res, next) => {
    return new Promise((resolve, reject) => {
        let filter
        if (req.query.status) {
            filter = {
                status: req.query.status,
            }
        } else if (req.query.bucket) {
            filter = {
                bucket: req.query.bucket,
            }
        } else if (req.query._id) {
            filter = {
                _id: req.query._id,
            }
        } else {
            filter = null
        }
        ToDo.find(filter, (err, obj) => {
            if (err) reject(Error.MongoError(err))

            // Success Message Payload
            const response = {}
            response.statusCode = 200
            response.message = 'TO DO Found'
            response.data = obj

            console.log('Response', response)
            resolve(response)
        })
    })
}

module.exports.update = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const input = {
            _id: req.query._id,
        }
        let update
        if (req.body.status) {
            update = {
                status: req.body.status,
            }
        } else if (req.body.bucket) {
            update = {
                bucket: req.body.bucket,
            }
        } else if (req.body.content) {
            update = {
                content: req.body.content,
            }
        } else {
            update = null
        }
        ToDo.updateOne(input, update, (err, obj) => {
            if (err) reject(Error.MongoError(err))

            // Success Message Payload
            const response = {}
            response.statusCode = 200
            response.message = 'TO DO Updated'
            response.data = obj

            console.log('Response', response)
            resolve(response)
        })
    })
}

module.exports.delete = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const filter = {
            _id: req.query._id,
        }
        ToDo.deleteOne(filter, (err, obj) => {
            if (err) reject(Error.MongoError(err))

            // Success Message Payload
            const response = {}
            response.statusCode = 200
            response.message = 'TO DO Deleted'
            response.data = obj

            console.log('Response', response)
            resolve(response)
        })
    })
}
