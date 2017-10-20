import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service'

@Component({
  selector: 'app-start-game-page',
  templateUrl: './start-game-page.component.html',
  styleUrls: ['./start-game-page.component.scss']
})
export class StartGamePageComponent implements OnInit {
  constructor(private _gameState: GameStateService) { }

  ngOnInit() {
  }

  startGameClick() {
    this._gameState.start({gold: {offense: 'ABC', defense: 'DEF'}, black: {offense: 'GHI', defense: 'KLM'}});
  }
}
