const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    headers: {
        type: Schema.Types.Mixed,
    },
    method: {
        type: Schema.Types.Mixed,
    },
    url: {
        type: Schema.Types.Mixed,
    },
    ip: {
        type: Schema.Types.Mixed,
    },
    cookies: {
        type: Schema.Types.Mixed,
    },
    baseUrl: {
        type: Schema.Types.Mixed,
    },
    path: {
        type: Schema.Types.Mixed,
    },
    body: {
        type: Schema.Types.Mixed,
    },
    route: {
        type: Schema.Types.Mixed,
    },
    query: {
        type: Schema.Types.Mixed,
    },
    protocol: {
        type: Schema.Types.Mixed,
    },
    params: {
        type: Schema.Types.Mixed,
    },
    sessionID: {
        type: Schema.Types.Mixed,
    },
})


const Request = mongoose.model('request', requestSchema)
module.exports = Request
