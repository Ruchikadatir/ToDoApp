const express = require('express')
const router = new express.Router()
const health = require('../controllers/health')
router.get('*', (req, res, next) => {
    health.get().then((response) => {
        req.response = response
        next()
    }).catch((err) => {
        next(err)
    })
})
//  Other handlers
// exports all routes
module.exports = router
