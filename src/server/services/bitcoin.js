const RpcClient = require('bitcoind-rpc')

const {
  BITCOIND_RPC_USER: user,
  BITCOIND_RPC_PASSWORD: pass,
  BITCOIND_RPC_PROTOCOL: protocol,
  BITCOIND_RPC_HOST: host,
  BITCOIND_RPC_PORT: port
} = require('../../env')

const options = { protocol, host, port, user, pass }
const rpcClient = new RpcClient(options)

module.exports = {
  bitcoin: rpcClient
}
