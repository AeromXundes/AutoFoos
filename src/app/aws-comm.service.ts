import { Injectable } from '@angular/core';

@Injectable()
export class AwsCommService {

  constructor() { }

  sendGame(gameStats, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener("load", callback);
    request.open("POST", "10.240.132.121:80/update_data" , true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(gameStats));
  }

}
