#!/usr/bin/env bash

ng build --prod --aot --base-href .
cp {main.js,package.json} dist
cp build/env.prod.js dist/env.js
