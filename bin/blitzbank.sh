#!/usr/bin/env sh

export NODE_ENV=production

dir=server

if [ -d "$dir" ]
then
  node $dir
else
  node node_modules/@blitzbank/dashboard/$dir
fi
