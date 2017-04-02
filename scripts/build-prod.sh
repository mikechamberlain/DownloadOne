#!/usr/bin/env bash

ng build --prod --aot --base-href .
cp {main.js,package.json} dist
cp .env.prod dist/.env
