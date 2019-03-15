# ⚡️ Blitzbank Dashboard  🏦

Here‘s to the #reckless! ⚡️
A dashboard for your Bitcoind/LND full node.

[![tippin.me](https://badgen.net/badge/%E2%9A%A1%EF%B8%8Ftippin.me/@dennisreimann/F0918E)](https://tippin.me/@dennisreimann)
[![npm](https://img.shields.io/npm/v/@blitzbank/dashboard.svg)](https://www.npmjs.com/package/@blitzbank/dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/dennisreimann/blitzbank-dashboard/badge.svg)](https://snyk.io/test/github/dennisreimann/blitzbank-dashboard)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## 🗜 Prerequisites

The app requires at least Node.js 10.13 (tracking the latest active Node.js LTS version).
This guarantees a reasonable level of backwards compatibility.

You will need a Bitcoin and LND full node to run the app.
For development you can use the
[bitstein-test-env](https://medium.com/@bitstein/setting-up-a-bitcoin-lightning-network-test-environment-ab967167594a) or its
[dockerized version](https://github.com/JeffVandrewJr/bitstein-test-env).

## 📦 Setup

### ✨ Environment variables

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

### 🛠 Development Setup

Dependencies are managed via [Yarn](https://yarnpkg.com/).
Once you have Yarn installed and this repo cloned, you can setup the packages:

```bash
yarn install
```

Create a build and rebuild on file change.

```bash
yarn start
```
