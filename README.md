# ⚡️ Blitzbank Dashboard   🏦

Here‘s to the ***#reckless***! ⚡️
Dashboard for your Bitcoind/LND full node.

[![tippin.me](https://badgen.net/badge/%E2%9A%A1%EF%B8%8Ftippin.me/@dennisreimann/F0918E)](https://tippin.me/@dennisreimann)
[![npm](https://img.shields.io/npm/v/@blitzbank/dashboard.svg)](https://www.npmjs.com/package/@blitzbank/dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/dennisreimann/blitzbank-dashboard/badge.svg)](https://snyk.io/test/github/dennisreimann/blitzbank-dashboard)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## 👉 Disclaimer

This is an early stage project.
Right now this is my personal playground for figuring out how to approach Lightning node management from an UX perspective.
Potentially everything is subject to change.

Nevertheless: As we are all figuring stuff out, I am putting this project out here and invite feedback.
Let me know in case I can help setting up the dashboard – that's how we can improve the documentation too. 😉

## 🗜 Prerequisites

The app requires at least Node.js 10.13 (tracking the latest active Node.js LTS version).
This guarantees a reasonable level of backwards compatibility.

You will need a Bitcoin and LND full node to run the app.
For development you can use the
[bitstein-test-env](https://medium.com/@bitstein/setting-up-a-bitcoin-lightning-network-test-environment-ab967167594a) or its
[dockerized version](https://github.com/JeffVandrewJr/bitstein-test-env).

## 🖥 Screenshots

Here are some example screenshots:

[Home](media/home.png) | [Peers](media/peers.png) | [Channels](media/channels.png) |
[Invoices](media/invoices.png) | [Payments](media/payments.png) | [System](media/system.png)

## 📦 Setup

I will make this easier at some point, but for now …
SSH into your full node and execute the following commands:

```sh
# create a new directory for the dashboard
mkdir dashboard
cd dashboard

# initialize an empty project and install the app
npm init @blitzbank/dashboard

# edit the .env file in your favorite editor
# (see the list of variables below)
vim .env

# start the app
blitzbank
```

You will most likely need to [setup a process manager](https://expressjs.com/en/advanced/best-practice-performance.html#ensure-your-app-automatically-restarts) to keep the app running.
I will improve the deployment too – promised!

## ✨ Environment variables

These env variables should be set:

- `BITCOIND_RPC_PROTOCOL` - default: `http`
- `BITCOIND_RPC_HOST` - default: `127.0.0.1`
- `BITCOIND_RPC_PORT` - default: `8332`
- `BITCOIND_RPC_USER`
- `BITCOIND_RPC_PASSWORD`
- `LND_RPC_HOST` - default: `localhost`
- `LND_RPC_PORT` - default: `10009`
- `LND_CERT_BASE64` - the base64 encoded string of the `tls.cert` file
- `LND_MACAROON_BASE64` - the base64 encoded string of the macaroon file
- `SERVER_PORT` - default: `4000`
- `SOCKET_PORT` - default: `4001`

You also need to define the credentials for the dashboard and API requests:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`

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

## 🖖 Alternatives

Here are some other projects with similar goals, you might want to have a look at those too:

- [RTL – Ride the Lightning](https://github.com/ShahanaFarooqui/RTL)
- [lnd-admin](https://github.com/janoside/lnd-admin)
- [lndash](https://github.com/djmelik/lndash)
- [ln-dashboard](https://github.com/PatrickLemke/ln-dashboard)
