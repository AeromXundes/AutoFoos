import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

//  constructor(private element:player) { }
//  constructor(private element:string) { }
  constructor() { }

  ngOnInit() {
//    console.log(this.element);
//    console.log(this.playerData);
  }

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
