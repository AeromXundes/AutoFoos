import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { PlayersListService  } from '../../players-list.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  constructor(private _playersList: PlayersListService, private papa: PapaParseService, public dialog: MatDialog, private http: Http) { }

  ngOnInit() {
  }

  selection(name){
    console.log(name);
    this.http.get("http://10.240.132.121:80/players/"+name+".json").subscribe(
      data => {
        //console.log(data["_body"]);
        let jsonData = JSON.parse(data["_body"]);
        this.openDialog(name, jsonData);
      },
      error=> {}
  );
    
  }

  image: string;
  name: string;
  gamesPlayed: number;
  winPerCent : number;
  winStreak: number;
  rank: number;
  offenseRank: number;
  defenseRank: number;
  rating: number;


  openDialog(_name, jsonData): void {
    let dialogRef = this.dialog.open(PlayerProfileDialog, {
      width: '400px',
      data: { name: jsonData["Name"], 
              image: "../src/assets/images/"+_name+".png", 
              gamesPlayed: jsonData["gamesPlayed"],
              winPerCent: jsonData["Winning Percentage"].toFixed(2)*100,
              winStreak: jsonData["longestWinningStreak"],
              rank: jsonData["overallRank"],
              offenseRank: jsonData["offenseRank"],
              defenseRank: jsonData["defenseRank"],
              rating: Math.round(jsonData["overallPoints"])
            }
    });
  }

  getPlayersList() {
    //I don't know why, but the name strings need to be wrapped in an oj=bject. Raw array of strings won't work
    let list = [];
    this.http.get("http://10.240.132.121/current_ranking").subscribe(
      data => {
        let csvString = data["_body"].toString();
        this.papa.parse(csvString, {
          complete: function(results) {
            let endIndex = 10;
            if (results.data.length - 1 < endIndex)
              endIndex = results.data.length - 1;
            for(let k = 0; k < results.data.length - 1; ++k){
              let currPlayerData = results.data[k];
              if (currPlayerData !== "") {
                this.list.push(currPlayerData[0])
              }
            }
          }
        });
      });

//    var list = this._playersList.getPlayersList();

    list.sort();
    var ret = [];
    for (var i = 0;  i < list.length;  i++) {
      if (list[i] == '') {
        continue;
      }
      ret.push({name: list[i]})
    }
    return ret; 
  }
  players = this.getPlayersList();
  playerName: string;
}

@Component({
  selector: 'player-profile-dialog',
  templateUrl: 'player-profile-dialog.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileDialog {

  constructor(
    public dialogRef: MatDialogRef<PlayerProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

} 