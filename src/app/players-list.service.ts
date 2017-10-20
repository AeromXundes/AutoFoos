import { Injectable } from '@angular/core';

@Injectable()
export class PlayersListService {

  constructor() { }

  listFileName = 'playersList.txt';
  fs = require('fs');
  list = [];
  fileIsLoaded = false;

  getPlayersList() {
    if (!this.fileIsLoaded) {
      this.list = this.readPlayersListFromFile();
    }
    return this.list;
  }

  addPlayer(name) {
    this.list.push(name);
    this.fs.appendFileSync(this.listFileName, name + '\n');
  }

  readPlayersListFromFile() {
    var contents = this.fs.readFileSync(this.listFileName).toString();
    return contents.split("\n");
  }

}
