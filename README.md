# Blitzbank Dashboard

A dashboard for your LND node.

## Setup

### Environment variables

These env variables need to be set or passed to the process:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `LND_HOST` - the IP or host address of the LND instance
- `LND_CERT_BASE64` - the base64 encoded string of the `tls.cert` file
- `MACAROON_BASE64` - the base64 encoded string of the macaroon file
- `GRPC_SSL_CIPHER_SUITES` - see the [ln-service README](https://github.com/alexbosworth/ln-service#configuring-environment-variables)
