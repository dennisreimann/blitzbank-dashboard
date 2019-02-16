# Blitzbank Dashboard

A dashboard for your LND node.

## Setup

### Environment variables

These env variables need to be set or passed to the process:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `LND_HOST` - the IP or host address of the LND instance (defaults to `localhost`)
- `LND_RPC_PORT` - the RPC port of the LND instance (defaults to `10009`)
- `LND_CERT_BASE64` - the base64 encoded string of the `tls.cert` file
- `MACAROON_BASE64` - the base64 encoded string of the macaroon file

You can store these in a `.env` file in the root directory of the project.
