const express = require('express')
const router = new express.Router()
const todo = require('../controllers/to-do')

router.get('/welcome', (req, res, next) => {
    todo.get().then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})

router.post('/new', (req, res, next) => {
    todo.create(req, res, next).then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})

router.get('/fetch', (req, res, next) => {
    todo.fetch(req, res, next).then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})

router.put('/update', (req, res, next) => {
    todo.update(req, res, next).then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})

router.delete('/remove', (req, res, next) => {
    todo.delete(req, res, next).then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})
//  Other handlers
// exports all routes
module.exports = router
