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

module.exports.getAllBuckets = (req, res, next) => {
    return new Promise((resolve, reject) => {
        ToDo.find((err, obj) => {
            if (err) reject(Error.MongoError(err))


            let buckets = []
            buckets = obj.map((elem) => {
                return elem.bucket
            })
            console.log('buckets: ', buckets)
            // Success Message Payload
            const response = {}
            response.statusCode = 200
            response.message = 'TO DO Found'
            response.data = buckets

            console.log('Response')
            resolve(response)
        })
    })
}
