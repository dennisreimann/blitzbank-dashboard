const qrcode = require('qrcode')
const btcUnits = require('bitcoin-units')
const camelizeKeys = require('camelize-keys')
const { format: formatConnectionUrl, decodeMacaroon, decodeCert, encodeMacaroon, encodeCert } = require('lndconnect')
const { distanceInWordsToNow, format: formatDate, parse: parseDate } = require('date-fns')
const { lnd, lnService } = require('../../services/lnd')
const { PUBLIC_HOST, LND_RPC_PORT, LND_MACAROON_BASE64, LND_CERT_BASE64 } = require('../../env')

btcUnits.setDisplay('satoshi', { format: '{amount} sats' })

const formatAt = dateString => formatDate(parseDate(dateString), 'YYYY-MM-DD HH:MM:SS')
const connectionUrl = formatConnectionUrl({
  host: `${PUBLIC_HOST}:${LND_RPC_PORT}`,
  cert: encodeCert(decodeCert(LND_CERT_BASE64)),
  macaroon: encodeMacaroon(decodeMacaroon(LND_MACAROON_BASE64))
})
let connectionQRCode
(async function () { connectionQRCode = await qrcode.toDataURL(connectionUrl) })()

const decorate = async (result, fnName) => {
  result = camelizeKeys(result)

  switch (fnName) {
    case 'getWalletInfo':
      result.latestBlockRelative = distanceInWordsToNow(parseDate(result.latestBlockAt))
      result.connectionUrl = connectionUrl
      result.connectionQRCode = connectionQRCode
      break

    case 'getChainBalance':
      const satsChain = btcUnits(result.chainBalance, 'satoshi')
      result.chainBalanceSats = satsChain.format()
      result.chainBalanceBit = satsChain.to('bit').format()
      result.chainBalanceMbtc = satsChain.to('mbtc').format()
      result.chainBalanceBtc = satsChain.to('btc').format()
      break

    case 'getPendingChainBalance':
      const satsChainPending = btcUnits(result.pendingChainBalance, 'satoshi')
      result.pendingChainBalanceSats = satsChainPending.format()
      result.pendingChainBalanceBit = satsChainPending.to('bit').format()
      result.pendingChainBalanceMbtc = satsChainPending.to('mbtc').format()
      result.pendingChainBalanceBtc = satsChainPending.to('btc').format()
      break

    case 'getChannelBalance':
      const satsChannel = btcUnits(result.channelBalance, 'satoshi')
      result.channelBalanceSats = satsChannel.format()
      result.channelBalanceBit = satsChannel.to('bit').format()
      result.channelBalanceMbtc = satsChannel.to('mbtc').format()
      result.channelBalanceBtc = satsChannel.to('btc').format()

      const satsChannelPending = btcUnits(result.pendingBalance, 'satoshi')
      result.pendingChannelBalanceSats = satsChannelPending.format()
      result.pendingChannelBalanceBit = satsChannelPending.to('bit').format()
      result.pendingChannelBalanceMbtc = satsChannelPending.to('mbtc').format()
      result.pendingChannelBalanceBtc = satsChannelPending.to('btc').format()
      break

    case 'getInvoices':
      result.invoices = result.invoices.map(invoice => {
        return {
          ...invoice,
          createdDate: invoice.createdAt && formatAt(invoice.createdAt),
          expiresDate: invoice.expiresAt && formatAt(invoice.expiresAt),
          confirmedDate: invoice.confirmedAt && formatAt(invoice.confirmedAt)
        }
      })
      break

    case 'getPayments':
      result.payments = result.payments.map(payment => {
        return {
          ...payment,
          createdDate: payment.createdAt && formatAt(payment.createdAt)
        }
      })
      break

    case 'getPeers':
      result = await Promise.all(
        result.peers.map(async peer => {
          let node = {}
          try {
            node = await rpc('getNode', { public_key: peer.publicKey })
          } catch (err) {
            console.error(err)
          }

          return {
            ...peer,
            ...node
          }
        })
      )
      break
  }

  return result
}

const rpc = (fnName, opts = {}) => {
  return new Promise((resolve, reject) => {
    try {
      opts.lnd = lnd
      const fn = lnService[fnName]
      if (typeof fn === 'function') {
        fn(opts, async (error, result) => {
          if (error) {
            const [status, message, info] = error
            const err = new Error(`LND RPC ${fnName} failed. Payload: ${JSON.stringify(opts)}`)

            if (info && info.details) {
              const { details } = info
              err.details = details.replace(details[0], details[0].toUpperCase())
            } else if (message) {
              const sentence = message.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ')
              err.details = sentence.replace(sentence[0], sentence[0].toUpperCase())
            }

            err.status = status
            reject(err)
          } else {
            const res = await decorate(result, fnName)
            resolve(res)
          }
        })
      } else {
        const err = new Error(`${fnName} is not a LND service function.`)
        err.status = 500
        reject(err)
      }
    } catch (err) {
      err.status = 500
      reject(err)
    }
  })
}

module.exports = rpc
