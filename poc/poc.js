const net = require('net');
var socket = new net.Socket();
socket.connect(61337, "localhost", function() {
  console.log('connected to server');
});

// Sensor stuff

// BCM numbering
const pin_ledYel = 18;
const pin_irRecvGold = 23;
const pin_irRecvBlack = 22;
const pin_ledRed = 4;

var goldScore = 0;
var blackScore = 0;
vat timeOfLastGoal = 0;

var Gpio = require('pigpio').Gpio;
var ledYel = new Gpio(pin_ledYel, {mode: Gpio.OUTPUT});
var ledRed = new Gpio(pin_ledRed, {mode: Gpio.OUTPUT});
ledYel.digitalWrite(0);
ledRed.digitalWrite(0);
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

function goldBeamConnected(connected) {
  if (connected) {
    ledYel.digitalWrite(1);
  } else {
    ledYel.digitalWrite(0);
  }
}

function blackBeamConncted(connected) {
  if (connected) {
    ledRed.digitalWrite(1);
  } else {
    ledRed.digitalWrite(0);
  }
}

function incrementGoldScore() {
  if ((Date.now() - timeOfLastGoal) < 1000) {
    return;
  }
  timeOfLastGoal = Date.now();
  goldScore += 1;
  socket.write(JSON.stringify({response:'gs'}));
  console.log('Gold: ' + goldScore);
}

function incrementBlackScore() {
  if ((Date.now() - timeOfLastGoal) < 1000) {
    return;
  }
  timeOfLastGoal = Date.now();
  blackScore += 1;
  socket.write(JSON.stringify({response:'bs'}));
  console.log('Black: ' + blackScore);
}

irRecvBlack.on('interrupt', function(level) {
  console.log('black interrupt');
  if (level === 1) {
    // rising edge detected, so beam was connected
    console.log('black rising');
    blackBeamConncted(true);
  } else {
    // falling edge detected, so beam was just broken
    console.log('black falling');
    blackBeamConncted(false);
    incrementBlackScore();
  }
});

irRecvGold.on('interrupt', function(level) {
  console.log('gold interrupt');
  if (level === 1) {
	console.log('gold rising');
    goldBeamConnected(true);
  } else {
	console.log('gold falling');
    goldBeamConnected(false);
    incrementGoldScore();
  }
});

if (irRecvGold.digitalRead() === 1) {
  console.log('gold initially high');
  goldBeamConnected(true);
}
if (irRecvBlack.digitalRead() === 1) {
  console.log('black initially high');
  blackBeamConncted(true);
}

console.log('started');
