const lnd = require('./src/server/service/lnd');

(async function () {
  try {
    const result = await lnd('getWalletInfo')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
