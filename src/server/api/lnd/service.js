const assert = require('assert')
const lnService = require('ln-service')
const btcUnits = require('bitcoin-units')
const camelizeKeys = require('camelize-keys')
const { distanceInWordsToNow, parse: parseDate } = require('date-fns')

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
          err ? reject(err) : resolve(decorate(result, fnName))
        })
      } else {
        reject(new Error(`${fnName} is not a LND service function.`))
      }
    } catch (err) {
      reject(err)
    }
  })

btcUnits.setDisplay('satoshi', { format: '{amount} sats' })

function decorate (result, fnName) {
  result = camelizeKeys(result)

  switch (fnName) {
    case 'getWalletInfo':
      result.latestBlockRelative = distanceInWordsToNow(parseDate(result.latestBlockAt))
      break

    case 'getChainBalance':
      const satsC = btcUnits(result.chainBalance, 'satoshi')
      result.chainBalanceSats = satsC.format()
      result.chainBalanceBit = satsC.to('bit').format()
      result.chainBalanceMbtc = satsC.to('mbtc').format()
      result.chainBalanceBtc = satsC.to('btc').format()
      break

    case 'getPendingChainBalance':
      const satsP = btcUnits(result.pendingChainBalance, 'satoshi')
      result.pendingChainBalanceSats = satsP.format()
      result.pendingChainBalanceBit = satsP.to('bit').format()
      result.pendingChainBalanceMbtc = satsP.to('mbtc').format()
      result.pendingChainBalanceBtc = satsP.to('btc').format()
      break
  }

  return result
}
