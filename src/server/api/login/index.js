const { Router } = require('express')
const passport = require('passport')
const authenticate = require('../../auth')
const router = Router()

router.get('/',
  authenticate,
  (req, res) => { res.json(req.user) })

router.post('/',
  passport.authenticate('local', { session: true }),
  (req, res) => { res.json(req.user) })

module.exports = router
