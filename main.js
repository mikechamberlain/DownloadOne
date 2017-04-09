const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const env = require('./env');

let win = null;

app.on('ready', function () {

    win = new BrowserWindow({
        width: 1500,
        height: 900,
        show: false
    });
    env.initializeWindow(win);

    // only show once everything has finished loading
    win.once('ready-to-show', () => win.show());

    // Remove window once app is closed
    win.on('closed', () => win = null);

    // Create the Application's main menu
    const template = [
        {
            label: "Application",
            submenu: [
                {label: "About Application", selector: "orderFrontStandardAboutPanel:"},
                {type: "separator"},
                {
                    label: "Quit",
                    accelerator: "Command+Q",
                    click: function () { app.quit(); }
                }]
        }, {
            label: "Edit",
            submenu: [
                {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
                {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
                {type: "separator"},
                {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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


const request = require('request');
const http = require('http');
const fs = require('mz/fs');
const path = require('path');
const os = require('os');
const url = require('url');

const uri = 'http://speedtest.ftp.otenet.gr/files/test100k.db';
const dir = path.join(os.homedir(), 'Downloads');


ipcMain.on('prepare-download', (event, arg) => {
    console.log(arg);
    checkRemoteFile(arg.url)
        .then(remote => {
            Object.assign(arg, remote);
            return createLocalFileForDownload(dir, arg.url);
        }, err => {
            Object.assign(arg, err);
            event.sender.send('download-prepared', arg);
        })
        .then(local => {
            if (local) {
                Object.assign(arg, local);
                event.sender.send('download-prepared', arg);
            }
        });
});

ipcMain.on('download-chunk', (event, arg) => {
    console.log(arg);
    downloadToFileDescriptor(arg.url, arg.fd, (soFar) => {
        event.sender.send('download-progress', Object.assign(arg, {bytesDownloaded: soFar}));
    });
});

function createLocalFileForDownload(dir, downloadUrl) {
    const urlPathParts = url.parse(downloadUrl).path.split('/');
    const filename = urlPathParts[urlPathParts.length - 1];
    return createFileWithUniqueName(dir, filename);
}

function checkRemoteFile(uri) {
    const options = {
        uri: uri,
        method: 'HEAD',
        followAllRedirects: true
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            if (res.statusCode >= 400) {
                reject({error: res.statusCode});
                return;
            }

            const len = res.headers['content-length'];
            if (!len) {
                resolve({length: -1});
                return;
            }
            resolve({length: +res.headers['content-length']});
        });
    });
}

function createFileWithUniqueName(dir, baseName, attempt = 0) {
    let nextFilename;
    if (attempt === 0) {
        nextFilename = baseName;
    } else {
        const parsedFilename = path.parse(baseName);
        nextFilename = parsedFilename.name + ' (' + attempt + ')' + parsedFilename.ext;
    }
    const fullPath = path.join(dir, nextFilename);

    return fs.open(fullPath, 'wx').then(
        fd => {
            return {fd, fullPath}
        },
        err => {
            if (err.code === 'EEXIST') {
                return createFileWithUniqueName(dir, baseName, attempt + 1);
            }
            throw err;
        });
}


function downloadToFileDescriptor(uri, fd, reportProgress) {
    let soFar = 0;
    const stream = fs.createWriteStream(null, {flags: 'wx', fd: fd});

    http.get(uri, res => {
        console.log(res.headers);
        res.on('end', () => {
            stream.end();
            console.log('done!!')
        });
        res.on('data', chunk => {
            soFar += chunk.length;
            reportProgress(soFar);
            console.log(soFar + ' of ' + res.headers['content-length']);
        });
        res.pipe(stream);
    });
}
