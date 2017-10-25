import { app, BrowserWindow, globalShortcut, screen } from 'electron';
import * as path from 'path';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');


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

var spawn = require('child_process').spawn;
var winnerOffense = 'Abc';
var winnerDefense = 'Def';
var loserOffense = 'Ghi';
var loserDefense = 'Jkl';
var loserScore = '4';
var py = spawn('python', ['RasberryElo.py', winnerOffense,  winnerDefense, loserOffense, loserDefense, loserScore]);


// Sensor stuff

// BCM numbering
const pin_ledYel = 12;
const pin_irRecvGold = 16;
const pin_irRecvBlack = 15;
const pin_ledRed = 7;

var goldScore = 0;
var blackScore = 0;

var Gpio = require('pigpio').Gpio;
var ledYel = new Gpio(pin_ledYel, {mode: Gpio.OUTPUT});
var ledRed = new Gpio(pin_ledRed, {mode: Gpio.OUTPUT});
var irRecvGold = new Gpio(pin_irRecvGold, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  edge: Gpio.EITHER_EDGE
});
var irRecvBlack = new Gpio(pin_irRecvBlack, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  edge: Gpio.EITHER_EDGE
});

function mapIrToLed(channel) {
  if (channel === pin_irRecvGold) {
    return pin_ledYel;
  } else if (channel === pin_irRecvBlack) {
    return pin_ledRed;
  } else {
    return -1;
  }
}

function goldBeamConnected(connected: boolean) {
  if (connected) {
    ledYel.digitalWrite(1);
  } else {
    ledYel.digitalWrite(0);
  }
}

function blackBeamConncted(connected: boolean) {
  if (connected) {
    ledRed.digitalWrite(1);
  } else {
    ledRed.digitalWrite(0);
  }
}

function incrementGoldScore() {
  goldScore += 1;
  console.log('Gold: ' + goldScore);
}

function incrementBlackScore() {
  blackScore += 1;
  console.log('Black: ' + blackScore);
}

irRecvBlack.on('interrupt', function(level) {
  if (level === 1) {
    // rising edge detected, so beam was connected
    blackBeamConncted(true);
  } else {
    // falling edge detected, so beam was just broken
    blackBeamConncted(false);
    incrementBlackScore();
  }
});

irRecvGold.on('interrupt', function(level) {
  if (level === 1) {
    goldBeamConnected(true);
  } else {
    goldBeamConnected(false);
    incrementGoldScore();
  }
});
