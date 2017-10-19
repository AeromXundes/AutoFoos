import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defense-player',
  templateUrl: './defense-player.component.html',
  styleUrls: ['./defense-player.component.scss']
})
export class DefensePlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
