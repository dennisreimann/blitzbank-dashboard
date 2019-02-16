const createLnRpc = require('@radar/lnrpc')

const {
  LND_HOST: host,
  LND_RPC_PORT: rpcPort,
  LND_CERT_BASE64: certBase64,
  MACAROON_BASE64: macaroonBase64
} = process.env

const certString = Buffer.from(certBase64, 'base64').toString()
const macaroonHex = Buffer.from(macaroonBase64, 'base64').toString('hex')
const server = `${host}:${rpcPort || 10009}`

module.exports = async () => createLnRpc({
  server,
  cert: certString,
  macaroon: macaroonHex
})
