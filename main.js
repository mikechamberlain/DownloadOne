const {app, BrowserWindow} = require('electron');
require('dotenv').config();
const path = require('path');
const url = require('url');

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  // Specify entry point
  if (process.env.packaged === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
      win.loadURL(process.env.entryPoint);
      win.webContents.openDevTools();
  }

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

app.on('window-all-closed', function () {
  // if (process.platform != 'darwin') {
  //
  // }
  app.quit();
});
