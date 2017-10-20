import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offense-player',
  templateUrl: './offense-player.component.html',
  styleUrls: ['./offense-player.component.scss']
})
export class OffensePlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  offensePlayer: string;
  
    players = [
      {value: 'p1', viewName: 'Kwang'},
      {value: 'p2', viewName: 'Dan'},
      {value: 'p3', viewName: 'Raihan'},
      {value: 'p4', viewName: 'Kevin'},
      {value: 'p5', viewName: 'Jaq'},
      {value: 'p6', viewName: 'Jason'}
    ];
}
