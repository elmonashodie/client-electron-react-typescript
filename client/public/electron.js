const electron = require('electron');
const electronIsDev = require('electron-is-dev');
const path = require('path');

const { app, BrowserWindow } = electron;
let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', closeApp);
app.on('activate', activateWindow);

function createWindow () {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(electronIsDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', removeWindowReference);
}

function removeWindowReference () {
  mainWindow = null;
}

function closeApp () {
  if (process.platform !== 'darwin') { app.quit(); }
}

function activateWindow () {
  if (mainWindow === null) { createWindow(); }
}
