const { Router } = require('express')
const lnd = require('./lnd')
const sys = require('./sys')

const router = Router()

router.use('/lnd', lnd)
router.use('/sys', sys)

module.exports = router
