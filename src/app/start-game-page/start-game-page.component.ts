import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-game-page',
  templateUrl: './start-game-page.component.html',
  styleUrls: ['./start-game-page.component.scss']
})
export class StartGamePageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  offensePlayer: string;
  defensePlayer: string;
  
  players = [
      {value: 'p1', viewName: 'Kwang'},
      {value: 'p2', viewName: 'Dan'},
      {value: 'p3', viewName: 'Raihan'},
      {value: 'p4', viewName: 'Kevin'},
      {value: 'p5', viewName: 'Jaq'},
      {value: 'p6', viewName: 'Jason'}
  ];

}
