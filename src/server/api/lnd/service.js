const assert = require('assert')
const lnService = require('ln-service')
const camelizeKeys = require('camelize-keys')

const {
  LND_RPC_HOST: host = 'localhost',
  LND_RPC_PORT: rpcPort = 10009,
  LND_CERT_BASE64: cert,
  LND_MACAROON_BASE64: macaroon
} = process.env

assert(cert && macaroon, 'Provide the LND_CERT_BASE64 and LND_MACAROON_BASE64 environment variables.')

const socket = `${host}:${rpcPort}`
const options = { socket, cert, macaroon }
const lnd = lnService.lightningDaemon(options)

module.exports = (fnName, opts = {}) =>
  new Promise((resolve, reject) => {
    try {
      opts.lnd = lnd
      const fn = lnService[fnName]
      if (typeof fn === 'function') {
        fn(opts, (err, result) => {
          err ? reject(err) : resolve(camelizeKeys(result))
        })
      } else {
        reject(new Error(`${fnName} is not a LND service function.`))
      }
    } catch (err) {
      reject(err)
    }
  })
