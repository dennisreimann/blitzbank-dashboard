const assert = require('assert')
const RpcClient = require('bitcoind-rpc')
const camelizeKeys = require('camelize-keys')

const {
  BITCOIND_RPC_USER: user,
  BITCOIND_RPC_PASSWORD: pass,
  BITCOIND_RPC_PROTOCOL: protocol = 'http',
  BITCOIND_RPC_HOST: host = 'localhost',
  BITCOIND_RPC_PORT: port = 8332
} = process.env

assert(user && pass, 'Provide the BITCOIND_RPC_USER and BITCOIND_RPC_PASSWORD environment variables.')

const options = { protocol, host, port, user, pass }
const rpcClient = new RpcClient(options)
const decorate = camelizeKeys

module.exports = (fnName, ...args) =>
  new Promise((resolve, reject) => {
    try {
      const fn = rpcClient[fnName]
      if (typeof fn === 'function') {
        const handle = (err, { result }) => {
          err ? reject(err) : resolve(decorate(result))
        }
        args[0] === undefined
          ? rpcClient[fnName](handle)
          : rpcClient[fnName](...args, handle)
      } else {
        reject(new Error(`${fnName} is not a Bitcoin service function.`))
      }
    } catch (err) {
      reject(err)
    }
  })
