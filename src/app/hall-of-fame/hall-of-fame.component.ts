import { Component, OnInit } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { MatTableModule } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})

export class HallOfFameComponent implements OnInit {

  constructor(private papa: PapaParseService) {
  }

  ngOnInit() {
  }

  showTopPlayers() {
    this.papa.parse("https://raw.githubusercontent.com/AeromXundes/AutoFoos/master/currentStandings.csv", {
      download: true,
      complete: function(results) {
        for(var k = 1; k <= 10; ++k){
          var temp = results.data[k][0].split(",");
          //var obj = {name: temp[0], rating: temp[1], offense: temp[2], defense: temp[3]};
          //jsonData.push(obj);
          jsonData.push(new player(temp[0], temp[1], temp[2], temp[3]));
        }
      }
    });
    console.log(jsonData);
  }

  displayedColumns = ['name', 'rating', 'offense', 'defense'];
  dataSource = new PlayerDataSource();
}

class player{
  name: string;
  rating: number;
  offense: number;
  defense: number;

  constructor(name: string, rating: number, offense: number, defense: number){
    this.name = name;
    this.rating = rating;
    this.offense = offense;
    this.defense = defense;
  }
}

export interface Player {
  name: string;
  rating: number;
  offense: number;
  defense: number;
}

let jsonData: Player[] = [];

export class PlayerDataSource extends DataSource<any> {
  connect(): Observable<Player[]>{
    return Observable.of(jsonData);
  }
  disconnect(){}
}
