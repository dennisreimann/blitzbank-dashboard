const lnService = require('ln-service')
const {
  LND_RPC_HOST: host,
  LND_RPC_PORT: rpcPort,
  LND_CERT_BASE64: cert,
  LND_MACAROON_BASE64: macaroon
} = require('../env')

const socket = `${host}:${rpcPort}`
const options = { socket, cert, macaroon }
const lnd = lnService.lightningDaemon(options)

module.exports = {
  lnd,
  lnService
}
