const btcUnits = require('bitcoin-units')
const camelizeKeys = require('camelize-keys')
const { distanceInWordsToNow, parse: parseDate } = require('date-fns')
const { lnd, lnService } = require('../../services/lnd')

btcUnits.setDisplay('satoshi', { format: '{amount} sats' })

const decorate = async (result, fnName) => {
  result = camelizeKeys(result)

  switch (fnName) {
    case 'getWalletInfo':
      result.latestBlockRelative = distanceInWordsToNow(parseDate(result.latestBlockAt))
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
