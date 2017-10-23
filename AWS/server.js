const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize http server

// appInterface deals with interaction with base station
const appInterface = express();
// webInterface deals with web users from browsers
const webInterface = express();

var spawn = require('child_process').spawn;
var es = require('event-stream');
var fs = require('fs');
var fse = require('fs-extra');

appInterface.use(bodyParser.json());
webInterface.use(bodyParser.json());

// Handle /current_ranking
webInterface.get('/current_ranking', (req, res) => {
  var msg = ""
  const inputFile = 'currentStandings.csv'

  fs.createReadStream(inputFile)
    .pipe(es.split())
    .pipe(es.mapSync(function(line) {
      msg += line;
      msg += '\r\n';
    })) // mapSync
    .on('close', () => {
      console.log('Sending the most recent ranking')
      console.log(msg)
      res.send(msg);
    }) // on('close')
});

// Handle /update_data
webInterface.post('/update_data', (req, res) => {
  var msg = ""
  const inputFile = 'currentStandings.csv'
  const updates = req.body;

  console.log('Receiving new match record:')
  console.log(req.body);

  var winnerOffense = updates['OffenseWinner'];
  var winnerDefense = updates['DefenseWinner'];
  var loserOffense = updates['OffenseLoser'];
  var loserDefense = updates['DefenseLoser'];
  var loserScore = updates['Margin'];
  var py = spawn('python', ['RasberryElo.py', winnerOffense, 
    winnerDefense, loserOffense, loserDefense, loserScore]);
  py.on('exit', () => {
    fs.createReadStream(inputFile)
      .pipe(es.split())
      .pipe(es.mapSync(function(line) {
        msg += line;
        msg += '\r\n';
      })) // mapSync
      .on('end', () => {
         // TODO: this is temporary to generate index.html
         fse.copySync('currentStandings.csv', 'index.html')
         console.log('Sending updated ranking')
         res.send(msg)
      }) // on('end')
  })
})

webInterface.get('/', (req, res) => {
 // res.redirect('https://jpkolbush.github.io/index.html');
 // TODO: we are sending html as a file
 res.sendFile(path.join(__dirname, '/index.html'));
})

// Launch the server on port 3000
const server = appInterface.listen(1000, () => {
  const { address, port } = server.address();
  console.log(`Listening at port 1000`);
});

// Launch the server on port 3000
const server2 = webInterface.listen(80, () => {
  const { address, port } = server2.address();
  console.log(`Listening at 80`);
});