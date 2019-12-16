#!/usr/bin/env bash

set -e

RELEASE_PATH=$1
APP_PATH=/var/apps/lunchtime/
CURRENT_PATH=${APP_PATH}releases/current

echo 'Add env variables'
cp ${APP_PATH}/.env ${RELEASE_PATH}

echo 'Link current release path'
ln -nfs $RELEASE_PATH $CURRENT_PATH

echo 'CD to release directory'
cd $CURRENT_PATH

echo 'Install npm dependencies'
npm install

echo 'Build front-end page'
npm run build

echo 'Start application'
pm2 restart app.js
