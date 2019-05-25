require('dotenv').config()

const assert = require('assert')

const {
  // Bitcoin
  BITCOIND_RPC_USER,
  BITCOIND_RPC_PASSWORD,
  BITCOIND_RPC_PROTOCOL = 'http',
  BITCOIND_RPC_HOST = 'localhost',
  BITCOIND_RPC_PORT = 8332,
  // LND
  LND_MACAROON_BASE64,
  LND_CERT_BASE64,
  LND_RPC_HOST = 'localhost',
  LND_RPC_PORT = 10009,
  // App
  AUTH_USERNAME,
  AUTH_PASSWORD,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
  PUBLIC_HOST,
  SERVER_PORT = 4000,
  NODE_ENV = 'production',
  SESSION_SECRET = Math.random().toString(36).replace(/[^a-z]+/g, '')
} = process.env

assert(BITCOIND_RPC_USER && BITCOIND_RPC_PASSWORD, 'Provide the BITCOIND_RPC_USER and BITCOIND_RPC_PASSWORD environment variables.')
assert(LND_CERT_BASE64 && LND_MACAROON_BASE64, 'Provide the LND_CERT_BASE64 and LND_MACAROON_BASE64 environment variables.')
assert(AUTH_USERNAME && AUTH_PASSWORD, 'Provide the AUTH_USERNAME and AUTH_PASSWORD environment variables.')
assert(SSL_KEY_PATH && SSL_CERT_PATH, 'Provide the SSL_KEY_PATH and SSL_CERT_PATH environment variables.')

module.exports = {
  BITCOIND_RPC_USER,
  BITCOIND_RPC_PASSWORD,
  BITCOIND_RPC_PROTOCOL,
  BITCOIND_RPC_HOST,
  BITCOIND_RPC_PORT,
  LND_RPC_HOST,
  LND_RPC_PORT,
  LND_CERT_BASE64,
  LND_MACAROON_BASE64,
  AUTH_USERNAME,
  AUTH_PASSWORD,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
  SERVER_PORT,
  PUBLIC_HOST,
  NODE_ENV,
  SESSION_SECRET
}
