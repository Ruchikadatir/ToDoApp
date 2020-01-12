const mongoose = require('mongoose')
// const config = require(`${__dirname}/../config/config`)
const MONGO_URL = require('../m_modules/mongoConnectionURL')()
mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('connected')
}).catch((err)=>{
    console.error(err)
})
mongoose.Promise = global.Promise
const mongodb = mongoose.connection
// CONNECTION EVENTS
// When successfully connected
mongodb.on('connected', function() {
    console.log('Mongoose default connection open to ' + MONGO_URL)
})
// If the connection throws an error
mongodb.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})
// When the connection is disconnected
mongodb.on('disconnected', function() {
    console.log('Mongoose default connection disconnected')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongodb.close(function() {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})
module.exports = {
    mongodb,
}
