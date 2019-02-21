# Blitzbank Dashboard

A dashboard for your Bitcoind/LND full node.

## Setup

### Environment variables

These env variables need to be set or passed to the process:

- `BITCOIND_RPC_PROTOCOL` - default: `http`
- `BITCOIND_RPC_HOST` - default: `127.0.0.1`
- `BITCOIND_RPC_PORT` - default: `8332`
- `BITCOIND_RPC_USER`
- `BITCOIND_RPC_PASSWORD`
- `LND_RPC_HOST` - default: `localhost`
- `LND_RPC_PORT` - default: `10009`
- `LND_CERT_BASE64` - the base64 encoded string of the `tls.cert` file
- `LND_MACAROON_BASE64` - the base64 encoded string of the macaroon file

You also need to define the credentials for the dashboard and API requests:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`

You can store these in a `.env` file in the root directory of the project.
