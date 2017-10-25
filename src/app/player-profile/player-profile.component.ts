import { Component, OnInit, Inject } from '@angular/core';
import { PlayersListService  } from '../players-list.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  constructor(private _playersList: PlayersListService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  selection(name){
    console.log(name);
    this.openDialog(name);
  }

  image: string;
  name: string;

  openDialog(_name): void {
    let dialogRef = this.dialog.open(PlayerProfileDialog, {
      width: '400px',
      data: { name: _name, image: "images/"+_name+".png" }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   //this.image = result; 
    // });
  }

  getPlayersList() {
    //I don't know why, but the name strings need to be wrapped in an oj=bject. Raw array of strings won't work
    var list = this._playersList.getPlayersList();
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
})
export class PlayerProfileDialog {

  constructor(
    public dialogRef: MatDialogRef<PlayerProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}