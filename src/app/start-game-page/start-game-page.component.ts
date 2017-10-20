import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-game-page',
  templateUrl: './start-game-page.component.html',
  styleUrls: ['./start-game-page.component.scss']
})
export class StartGamePageComponent implements OnInit {
  constructor(private _gameState: GameStateService, private router: Router) { }


  ngOnInit() {
  }


  startGame() {
    this._gameState.start();
    this.router.navigateByUrl('scoreboard');

  }
}
