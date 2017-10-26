import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PlayersListService {

  constructor(private http:Http) { }

  listFileName = 'playersList.txt';
  list = [];
  fileIsLoaded = false;

  addPlayer(player) {
    this.list.push(player);
  }

  getPlayersList() {
    return this.list;
  }


}