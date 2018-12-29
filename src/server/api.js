const { Router } = require('express')
const { lightningDaemon } = require('ln-service')
const getWalletInfo = require('ln-service/getWalletInfo')
const getChannels = require('ln-service/getChannels')

const {
  LND_HOST: host,
  LND_CERT_BASE64: cert,
  MACAROON_BASE64: macaroon
} = process.env

const socket = `${host}:10009`
const opts = { cert, macaroon, socket }
const lnd = lightningDaemon(opts)

const router = Router()

router.get('/info', async (req, res) => {
  const result = await getWalletInfo({ lnd })
  res.json(result)
})

router.get('/channels', async (req, res) => {
  const result = await getChannels({ lnd })
  res.json(result)
})

module.exports = router
