import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PapaParseService } from 'ngx-papaparse';
import { MatTabsModule, MatTableModule } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { PlayerProfileComponent } from '../player-profile/player-profile.component';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of'

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {

  private dataSource: PlayerDataSource;
  private ratingFlag: boolean;
  private rankFlag: boolean;

  constructor(private papa: PapaParseService, private http: Http, private router:Router) {
  }

  ngOnInit() {
    this.showTopPlayers();
 }

  ngAfterViewChecked() {
//    this.showTopPlayers();
  }

  onItemClick(element: player) {
    console.log(typeof(element));
//    let profilePage = new PlayerProfileComponent(element.name);
//    this.router.navigateByUrl('player-profile');
//    this.router.navigateByUrl('/players/' + element.name + '.html');
//    let profilePage = new PlayerProfileComponent(element);
    console.log(element);
    //TODO statically redirect the page
    //window.location.assign('http://10.240.132.121/players/' +  element.name + '.html');
  }


  showTopPlayers() {
    // this.http.get("http://10.240.132.121/current_ranking").subscribe(
    //   data => {
    //     jsonData = [];
    //     let csvString = data["_body"].toString();
    //     this.papa.parse(csvString, {
    //       complete: function(results) {
    //         let endIndex = 10;
    //         if (results.data.length - 1 < endIndex)
    //           endIndex = results.data.length - 1;
    //         for(let k = 0; k < endIndex; ++k){
    //           let currPlayerData = results.data[k];
    //           if (currPlayerData !== "")
    //           {
    //             this.ratingFlag = false;
    //             this.rankFlag = true;
    //             let prevRatingPlayer = currPlayerData[7].split("|");
    //             let diff = Math.round(currPlayerData[1]) - Math.round(prevRatingPlayer[1]);
    //             if(diff > 0 || diff !== diff){
    //               this.ratingFlag = true;
    //             }
    //             if(Number(currPlayerData[4]) > Number(prevRatingPlayer[0])){
    //               this.rankFlag = false;
    //             }

    //             let oneDayPrior = currPlayerData[7].split("|");
    //             let oneWeekPrior = currPlayerData[8].split("|");
    //             jsonData.push(new player(
    //               currPlayerData[4],
    //               this.rankFlag,
    //               currPlayerData[0], 
    //               Math.round(currPlayerData[1]).toString()+" {"+diff.toString()+"}", 
    //               this.ratingFlag, 
    //               currPlayerData[5], 
    //               Math.round(currPlayerData[2]), 
    //               currPlayerData[6], 
    //               Math.round(currPlayerData[3]),
    //               oneDayPrior[0],
    //               Math.round(oneDayPrior[1]),
    //               oneWeekPrior[0],
    //               Math.round(oneWeekPrior[1])
    //             ));
    //           }
    //         }
    //       }
    //     });
    //     this.dataSource = new PlayerDataSource(); 
    //   },
    //   error => {
    //     jsonData.push(new player(NaN, false, "", "", false, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN));
    //     this.dataSource = new PlayerDataSource(); 
    //   }
    // );
  }

  displayedColumns = ['rank', 'name', 'rating', 'offenseRanking', 'offense','defenseRanking', 'defense', 'oneDayPriorRanking', 'oneDayPriorRating', 'oneWeekPriorRanking', 'oneWeekPriorRating'];

}

export class player implements Player{
  rank: number;
  rankFlag: boolean;
  name: string;
  rating: string;
  ratingFlag: boolean;
  offenseRanking: number;
  offense: number;
  defenseRanking: number;
  defense: number;
  oneDayPriorRanking: number;
  oneDayPriorRating: number;
  oneWeekPriorRanking: number;
  oneWeekPriorRating: number;

  constructor(rank: number, rankFlag: boolean, name: string, rating: string, ratingFlag: boolean, offenseRanking: number, offense: number, defenseRanking: number, defense: number,
    oneDayPriorRanking: number, oneDayPriorRating: number, oneWeekPriorRanking: number, oneWeekPriorRating: number ){
    this.rank = rank;
    this.rankFlag = rankFlag;
    this.name = name;
    this.rating = rating;
    this.ratingFlag = ratingFlag;
    this.offense = offense;
    this.offenseRanking = offenseRanking;
    this.defense = defense;
    this.defenseRanking = defenseRanking;
    this.oneDayPriorRanking = oneDayPriorRanking;
    this.oneDayPriorRating = oneDayPriorRating;
    this.oneWeekPriorRanking = oneWeekPriorRanking;
    this.oneWeekPriorRating = oneWeekPriorRating;
  }
}

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
  oneDayPriorRanking: number;
  oneDayPriorRating: number;
  oneWeekPriorRanking: number;
  oneWeekPriorRating: number;
}

let jsonData: Player[] = [];

export class PlayerDataSource extends DataSource<any> {
  connect(): Observable<Player[]>{
    return Observable.of(jsonData);
  }
  disconnect(){}
}
