const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')
autoIncrement.initialize(mongoose.connection)

const Schema = mongoose.Schema

const todoSchema = new Schema(
    {
        count: {
            type: Number,
            unique: true,
            required: [true, 'can\'t be blank'],
            // min: 1
        },
        bucket: {
            type: String,
        },
        content: {
            type: String,
            required: [true, 'can\'t be blank'],
        },
        status: {
            type: String,
            enum: ['done', 'to-do'],
            default: 'to-do',

        },
    },
    {timestamps: true},

)

todoSchema.index({count: 1}, {unique: true})

todoSchema.plugin(autoIncrement.plugin, {model: 'ToDo', field: 'count', startAt: 1, incrementBy: 1})
todoSchema.plugin(uniqueValidator, {message: 'is already taken.'})
const ToDo = mongoose.model('ToDo', todoSchema)
module.exports = ToDo
