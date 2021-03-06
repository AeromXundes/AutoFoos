const express = require('express');
const path = require('path');
const http = require('http');
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
appInterface.use(express.static(path.join(__dirname, 'frontend/dist')));

// Handle /current_ranking
appInterface.get('/current_ranking', (req, res) => {
  var msg = ""
  const inputFile = 'currentStandings.csv'

  var text = fs.readFileSync(inputFile);
  console.log(text);
  res.send(text);
});

// Handle /update_data
appInterface.post('/update_data', (req, res) => {
  var msg = ""
  const inputFile = 'currentStandings.csv'
  const updates = req.body;

  console.log('Receiving new match record:')
  console.log(req.body);

  var py = spawn('python', ['jsonParse.py', JSON.stringify(updates)]);
  py.on('exit', () => {
    var text = fs.readFileSync(inputFile);
    console.log(text);
    res.send(text);
  })
})

appInterface.get('/', (req, res) => {
 // res.redirect('https://jpkolbush.github.io/index.html');
// res.sendFile(path.join(__dirname, '/index.html'));
 res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
})

appInterface.get('*', (req, res) => {
 // res.redirect('https://jpkolbush.github.io/index.html');
 res.sendFile(path.join(__dirname, req.url));
// res.sendFile(path.join(__dirname, 'foos-front/dist/index.html'));
})



// Launch the server on port 3000
const server = appInterface.listen(80, () => {
  const { address, port } = server.address();
  console.log(`Listening at 80`);
});

/*
appInterface.set('port', 80);

const server = http.createServer(appInterface);

//server.listen(port, () => { console.log('server running on port: ' + port}));
server.listen(80, () => {});
*/
