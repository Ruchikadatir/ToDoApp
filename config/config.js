const fs = require('fs')
const path = require('path')
// get the NODE_ENV
// const NODE_ENV = process.env.NODE_ENV || 'development'
// get the values maintained in config json file
const configBuffer = fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf-8')
const config = JSON.parse(configBuffer)
// get the environment specific variables support for MONGO, Redis, Kafka
// console.log(config)
module.exports = config
