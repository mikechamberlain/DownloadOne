const {app, BrowserWindow} = require('electron');
const env = require('./env');

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({ width: 1000, height: 600, show: false});
  env.initializeWindow(win);

  // only show once everything has finished loading
  win.once('ready-to-show', () => win.show());

  // Remove window once app is closed
  win.on('closed', () => win = null);

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

app.on('window-all-closed', function () {
  // if (process.platform != 'darwin') {
  app.quit();
  // }
});
