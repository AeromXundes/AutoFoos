import { app, BrowserWindow, globalShortcut, screen, ipcMain } from 'electron';
import * as path from 'path';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

//const ipcRenderer = require('electron').ipcRenderer;

let rendererGold;
let rendererBlack;

// Disable Hardware Acceleration
// => Significatly improves performance on the rapsi
app.disableHardwareAcceleration();

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 480,
    frame: false
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // if (serve) {
  //   win.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  app.on('ready', () => {
    globalShortcut.register('CommandOrControl+Q', () => {
      app.quit();
    })
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


ipcMain.on('registerGold', (event, arg) => {
  rendererGold = event.sender;
})

ipcMain.on('registerBlack', (event, arg) => {
  rendererBlack = event.sender;
})


var net = require('net');
var server = net.createServer(function (conn) {
  conn.on('data', function(data) {
    data = JSON.parse(data)
    if(data.response === 'gs')
    {
      if (rendererGold !== undefined)
      {
        rendererGold.send('gs', 'gs')
      }
    }
    if(data.response === 'bs')
    {
      if (rendererBlack !== undefined)
      {
        rendererBlack.send('bs', 'bs')
      }
    }
  });
});
server.listen(61337, "localhost", function() {});
