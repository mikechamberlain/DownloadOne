// This file contains environment specific functionality when running in dev mode. The build process will replace
// this one with ./build/env.prod.js.

exports.initializeWindow = function(win) {
  win.loadURL('http://localhost:4200/');
  win.webContents.openDevTools();
};
