/* eslint-disable camelcase */
const { Router } = require('express')
const lnd = require('./service')
const router = Router()

// Reference: https://github.com/alexbosworth/ln-service
const ROUTES = [
  // General
  ['get', '/info', 'getWalletInfo'],
  ['get', '/balance', ['getChainBalance', 'getPendingChainBalance']],

  // Peers
  ['get', '/peers', 'getPeers'],
  ['post', '/peers', 'addPeer', req => {
    const [public_key, socket] = req.body.addr.split('@')
    return { public_key, socket }
  }],
  ['delete', '/peers/:public_key', 'removePeer', req => req.params],

  // Addresses
  ['post', '/addresses', 'createChainAddress', req => {
    const format = req.body.format || 'np2wpkh'
    return { format }
  }],

  // Channels
  ['get', '/channels', 'listChannels'],
  ['post', '/channels', 'openChannel', req => {
    const [pubkey, host] = req.body.addr.split('@')
    return { addr: { pubkey, host }, perm: true }
  }],
  ['delete', '/channels/:channelPoint', 'closeChannel', req => {
    // TODO: req.params
  }]
]

ROUTES.map(([method, route, rpc, getPayload]) => {
  router[method](route, async (req, res) => {
    const payload = getPayload && getPayload(req)
    try {
      let result
      if (typeof rpc === 'object') {
        const calls = await Promise.all(rpc.map(c => lnd(c, payload)))
        result = calls.reduce((res, callRes) => Object.assign(res, callRes), {})
      } else {
        result = await lnd(rpc, payload)
      }
      res.json(result)
    } catch (err) {
      console.error('Error:', err)
      const [status, message, info] = err
      const msg = info ? info.details : (message || err.message)
      res.status(status || 500).send(msg)
    }
  })
})

module.exports = router
