const path = require('path');
const url = require('url');

exports.initializeWindow = function (win) {
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
};
