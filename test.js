// ---- General setup
const {
  LND_HOST: host,
  LND_RPC_PORT: rpcPort,
  LND_CERT_BASE64: certBase64,
  MACAROON_BASE64: macaroonBase64
} = process.env

const certString = Buffer.from(certBase64, 'base64').toString()
const macaroonHex = Buffer.from(macaroonBase64, 'base64').toString('hex')
const server = `${host}:${rpcPort || 10009}`

// ---- LN Service
const lnService = require('ln-service')
const lnd = lnService.lightningDaemon({
  socket: server,
  cert: certBase64,
  macaroon: macaroonBase64
})

lnService.getWalletInfo({ lnd }, (error, result) => {
  if (error) {
    console.error('lnService', error)
  } else {
    console.log('lnService', result)
  }
})

// ---- LN RPC
const createLnRpc = require('@radar/lnrpc');

(async function () {
  const lnRPC = await createLnRpc({
    server,
    cert: certString,
    macaroon: macaroonHex
  })

  try {
    const result = await lnRPC.getInfo()
    console.log('lnrpc', result)
  } catch (error) {
    console.error('lnrpc', error)
  }
})()
