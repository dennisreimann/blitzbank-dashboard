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
    const [pubkey = '', socket = ''] = req.body.addr.split('@')
    return { public_key: pubkey.trim(), socket: socket.trim() }
  }],
  ['delete', '/peers/:public_key', 'removePeer', req => req.params],

  // Addresses
  ['post', '/addresses', 'createChainAddress', req => {
    const format = req.body.format || 'np2wpkh'
    return { format }
  }],

  // Channels
  ['get', '/channels', ['getChannels', 'getPendingChannels']],
  ['get', '/channels/closed', ['getClosedChannels']],
  ['get', '/channels/:id', 'getChannel', req => req.params],
  ['get', '/channels/balance', 'getChannelBalance'],
  ['post', '/channels', 'openChannel', req => {
    const { pubkey, funding, pushing, isPrivate } = req.body
    return {
      partner_public_key: pubkey,
      local_tokens: parseInt(funding),
      give_tokens: parseInt(pushing),
      is_private: isPrivate
    }
  }],
  ['delete', '/channels/:id', 'closeChannel', req => {
    const { id } = req.params
    const { socket, partnerPublicKey, transactionId, transactionVout } = req.body
    return {
      id,
      socket,
      public_key: partnerPublicKey,
      transaction_id: transactionId,
      transaction_vout: transactionVout
    }
  }]
]

ROUTES.map(([method, route, rpc, getPayload]) => {
  router[method](route, async (req, res) => {
    const payload = getPayload && getPayload(req)
    try {
      if (process.env.NODE_ENV === 'development' && payload) console.debug(payload)
      let result
      if (typeof rpc === 'object') {
        const calls = await Promise.all(rpc.map(c => lnd(c, payload)))
        result = calls.reduce((res, callRes) => Object.assign(res, callRes), {})
      } else {
        result = await lnd(rpc, payload)
      }
      if (process.env.NODE_ENV === 'development') console.log(result)
      res.json(result)
    } catch (error) {
      res.status(error.status).send(error.details)
    }
  })
})

module.exports = router
