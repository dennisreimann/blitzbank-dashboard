import lnd from '../../../src/server/api/btc/service'

describe('BTC Service', () => {
  it('gets result', async () => {
    const result = await lnd('getBlockchainInfo')
    expect(result.chain).toMatch('regtest')
  })
})
