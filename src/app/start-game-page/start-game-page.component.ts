import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-game-page',
  templateUrl: './start-game-page.component.html',
  styleUrls: ['./start-game-page.component.scss']
})
export class StartGamePageComponent implements OnInit {
  backgroundUrl: ImageData;

  constructor(private _gameState: GameStateService, private router: Router) { }


  ngOnInit() {
    this.backgroundUrl = require('../../assets/Foosball_Table.png');
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
        players.gold.defense === players.gold.offense  ||
        players.gold.offense === players.black.offense ||
        players.gold.offense === players.black.defense ||
        players.black.defense === players.black.offense) {
          console.log('same player in several positions');
          return false;
    }
    return true;
  }

  startGame(): void {
    if (this.playerSelectionIsValid()) {
      this._gameState.start();
      this.router.navigateByUrl('scoreboard');
    }
  }

  editPlayer(): void {
    this.router.navigateByUrl('player-editor');
  }

  rankings() {
    this.router.navigateByUrl('hall-of-fame');
  }
}
