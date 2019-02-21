/* eslint-disable camelcase */
const { Router } = require('express')
const bitcoind = require('./service')
const router = Router()

// Reference: https://github.com/bitpay/bitcoind-rpc/blob/master/lib/index.js#L160
const ROUTES = [
  // General
  ['get', '/blockchaininfo', 'getBlockchainInfo'],
  ['get', '/blockcount', 'getBlockCount'],
  ['get', '/block/:header', 'getBlock', req => req.params.header]
]

ROUTES.map(([method, route, rpc, getPayload]) => {
  router[method](route, async (req, res) => {
    const payload = getPayload && getPayload(req)
    try {
      let result
      if (typeof rpc === 'object') {
        const calls = await Promise.all(rpc.map(c => bitcoind(c, payload)))
        result = calls.reduce((res, callRes) => Object.assign(res, callRes), {})
      } else {
        result = await bitcoind(rpc, payload)
      }
      res.json(result)
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send(err.message)
    }
  })
})

module.exports = router
