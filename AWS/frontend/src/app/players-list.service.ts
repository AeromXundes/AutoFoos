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
    console.log(name);
    this.http.get("http://10.240.132.121:80/playerslist").subscribe(
      data => {
        //console.log(data["_body"]);
        let jsonData = JSON.parse(data["_body"]);
//        this.openDialog(name, jsonData);
      },
      error=> {}
  );
    return this.list;
  }


}