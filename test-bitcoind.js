const bitcoinRpc = require('./src/server/service/bitcoind');

(async function () {
  try {
    const result = await bitcoinRpc('getBlockchainInfo')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
