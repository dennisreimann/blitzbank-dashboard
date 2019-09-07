const { Router } = require('express')

const router = Router()

router.use('/btc', require('./btc'))
router.use('/lnd', require('./lnd'))
router.use('/sys', require('./sys'))
router.use('/login', require('./login'))

module.exports = router
