import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PapaParseService } from 'ngx-papaparse';
import { MatTableModule } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let jsonData: Player[] = [];



export interface Player {
  rank: number;
  rankFlag: boolean;
  name: string;
  rating: string;
  ratingFlag: boolean;
  offenseRanking: number;
  offense: number;
  defenseRanking: number;
  defense: number;
}



export class PlayerDataSource extends DataSource<any> {
  connect(): Observable<Player[]>{
    return Observable.of(jsonData);
  }
  disconnect(){}
}

class player implements Player{
  rank: number;
  rankFlag: boolean;
  name: string;
  rating: string;
  ratingFlag: boolean;
  offenseRanking: number;
  offense: number;
  defenseRanking: number;
  defense: number;

  constructor(rank: number, rankFlag: boolean, name: string, rating: string, ratingFlag: boolean, offenseRanking: number, offense: number, defenseRanking: number, defense: number){
    this.rank = rank;
    this.rankFlag = rankFlag;
    this.name = name;
    this.rating = rating;
    this.ratingFlag = ratingFlag;
    this.offense = offense;
    this.offenseRanking = offenseRanking;
    this.defense = defense;
    this.defenseRanking = defenseRanking;
  }
  
}

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})

export class HallOfFameComponent implements OnInit {

  private dataSource: PlayerDataSource;
  private ratingFlag: boolean;
  private rankFlag: boolean;
  constructor(private papa: PapaParseService, private http: Http) {
  }

  ngOnInit() {
  }


  getShowTopPlayers() {
    var that = this;
    var showTopPlayers = function() {
      that.http.get("http://10.240.132.121/current_ranking").subscribe(
        data => {
          jsonData = [];
          let csvString = data["_body"].toString();
          that.papa.parse(csvString, {
            complete: function(results) {
              for(let k = 0; k < 10; ++k){
                let currPlayerData = results.data[k];
                that.ratingFlag = false;
                that.rankFlag = true;
                let prevRatingPlayer = currPlayerData[7].split("|");
                let diff = Math.round(currPlayerData[1]) - Math.round(prevRatingPlayer[1]);
                if(diff > 0 || diff !== diff){
                  that.ratingFlag = true;
                }
                if(Number(currPlayerData[4]) > Number(prevRatingPlayer[0])){
                  that.rankFlag = false;
                }
                jsonData.push(new player(
                  currPlayerData[4],
                  that.rankFlag,
                  currPlayerData[0], 
                  Math.round(currPlayerData[1]).toString()+" {"+diff.toString()+"}", 
                  that.ratingFlag, 
                  currPlayerData[5], 
                  Math.round(currPlayerData[2]), 
                  currPlayerData[6], 
                  Math.round(currPlayerData[3])));
              }
              that.dataSource = new PlayerDataSource();
            }
        });
        },
        error => {
          jsonData.push(new player(NaN, false, "", "", false, NaN, NaN, NaN, NaN));
        }

      );
      
    }
    return showTopPlayers;
  }
  displayedColumns = ['rank', 'name', 'rating', 'offenseRanking', 'offense','defenseRanking', 'defense'];

  grbg = this.getShowTopPlayers()();
}




