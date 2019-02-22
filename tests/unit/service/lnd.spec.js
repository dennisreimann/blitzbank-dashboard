import lnd from '../../../src/server/api/lnd/service'

describe('LND Service', () => {
  it('gets result', async () => {
    const result = await lnd('getWalletInfo')
    expect(result.alias).toMatch('alice')
  })
})
