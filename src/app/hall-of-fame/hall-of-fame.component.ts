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

  private dataSource: PlayerDataSource;
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
          jsonData.push(new player(temp[0], temp[1], temp[2], temp[5], temp[3], temp[6]));
        }
      }
    });
    this.dataSource = new PlayerDataSource();    
    console.log(jsonData);
  }

  displayedColumns = ['name', 'rating', 'offense', 'offenseRanking', 'defense','defenseRanking'];
  //dataSource = new PlayerDataSource();

}

class player implements Player{
  name: string;
  rating: number;
  offense: number;
  offenseRanking: number;
  defense: number;
  defenseRanking: number;

  constructor(name: string, rating: number, offense: number, offenseRanking: number, defense: number, defenseRanking: number){
    this.name = name;
    this.rating = rating;
    this.offense = offense;
    this.offenseRanking = offenseRanking;
    this.defense = defense;
    this.defenseRanking = defenseRanking;
  }
}

export interface Player {
  name: string;
  rating: number;
  offense: number;
  offenseRanking: number;
  defense: number;
  defenseRanking: number;
  //dayPrior: number;
  //weekPrior: number;
}

const jsonData: Player[] = [];
//   {name: "Dan", rating: 1900, offense: 1950, defense: 1850, dayPrior: 1910, weekPrior: 1850},
//   {name: "Alex", rating: 1800, offense: 1850, defense: 1750, dayPrior: 1780, weekPrior: 1850},
// ];

export class PlayerDataSource extends DataSource<any> {
  connect(): Observable<Player[]>{
    return Observable.of(jsonData);
  }
  disconnect(){}
}
