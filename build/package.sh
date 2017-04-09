#!/usr/bin/env bash

cd dist
ln -Ffs ../node_modules node_modules
electron-packager . --platform=darwin --arch=x64 --out=../release --overwrite
#electron-packager . --platform=win32 --arch=x64 --out=../release --overwrite
open ../release/DownloadOne-darwin-x64/DownloadOne.app/
