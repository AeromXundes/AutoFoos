import { Injectable } from '@angular/core';
const spawn = require('child_process').spawn

@Injectable()
export class AwsCommService {

  constructor() { }

  sendGame(gameStats) {
  //var request = new XMLHttpRequest();
  //  request.addEventListener("load", callback);
  //request.open("POST", "http://10.240.132.121/update_data" , true);
  //request.setRequestHeader('Content-Type', 'application/json');
    //request.send(JSON.stringify(gameStats));
    var python = spawn('python', ['/var/www/html/jsonParse.py', JSON.stringify(gameStats)]);
    console.log("about to send games")
    //var python = spawn('python', ['/Users/jkolbush/test.py']);
    // python.stdout.on('data', function (data){
    //   console.log("here")
    //   console.log(data);
    // });
    }


  getPage(relativeUrl, callback) {}
    // var http = require('http');
    // var options = {host: "10.240.132.121", port: 80, path: "/"};
    // options.path += relativeUrl;
    // var content = "";
    // var req = http.request(options, function(res) 
    //                                 {
    //                                   res.setEncoding("utf8");
    //                                   res.on("data", function (chunk)
    //                                                   {
    //                                                       content += chunk;
    //                                                   }
    //                                         );
                                      
    //                                   res.on("end", function ()
    //                                                 {
    //                                                   callback(content);
    //                                                 }
    //                                         );
    //                                 }
    //                       );
    // req.end();
  //}

  };
