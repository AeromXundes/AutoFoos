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

  playerSelectionIsValid() {
    var players = this._gameState.getPlayers();
    if (players.gold.offense === '' ||
        players.gold.defense === '' ||
        players.black.offense === ''||
        players.black.defense === '') {
          console.log('something is empty');
          return false;
    }
    if (players.gold.defense === players.black.offense ||
        players.gold.defense === players.black.defense ||
        players.gold.offense === players.black.offense ||
        players.gold.offense === players.black.defense) {
          console.log('player in both teams');
          return false;
    }
    return true;
  }

  startGame() {
    if (this.playerSelectionIsValid())
    {
      this._gameState.start();
      this.router.navigateByUrl('scoreboard');
    }
  }
}
