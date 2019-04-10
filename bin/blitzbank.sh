#!/usr/bin/env sh

export NODE_ENV=production
export PROJ_DIR=./node_modules/@blitzbank/dashboard
export DEPS_DIR=$PROJ_DIR/node_modules

node -r $DEPS_DIR/dotenv/config $PROJ_DIR/src/server/index.js
