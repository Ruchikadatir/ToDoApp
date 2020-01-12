const express = require('express')
const router = new express.Router()
const bucket = require('../controllers/bucket')

router.get('/welcome', (req, res, next) => {
    bucket.get().then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})

router.get('/fetch', (req, res, next) => {
    bucket.getAllBuckets(req, res, next).then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})
//  Other handlers
// exports all routes
module.exports = router
