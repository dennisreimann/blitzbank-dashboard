const { Router } = require('express')
const createLnRpc = require('../service/ln')

const router = Router()

const LN_RPC_ROUTES = [
  ['get', '/info', 'getInfo'],
  ['get', '/peers', 'listPeers'],
  ['post', '/peers', 'connectPeer', req => {
    const [pubkey, host] = req.body.addr.split('@')
    return { addr: { pubkey, host }, perm: true }
  }],
  ['delete', '/peers/:pubKey', 'disconnectPeer', req => req.params]
]

LN_RPC_ROUTES.map(([method, route, rpc, getPayload]) => {
  router[method](route, async (req, res) => {
    const payload = getPayload && getPayload(req)
    console.log('Payload:', JSON.stringify(payload, null, 2))
    try {
      const lnRPC = await createLnRpc()
      const result = await lnRPC[rpc](payload)
      console.log('Result:', JSON.stringify(result, null, 2))
      res.json(result)
    } catch (err) {
      const { message } = err
      console.error('Error:', err.message)
      res.status(500).send(message)
    }
  })
})

module.exports = router
