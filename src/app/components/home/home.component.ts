import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../../game-state.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor(private _gameState: GameStateService) { }


  ngOnInit() {
    this._gameState.start();
    this._gameState.goldScored();
    this._gameState.goldScored();
    this._gameState.goldScored();
    this._gameState.cancelGoldGoal();
    this.goldScore  = this._gameState.getScore().gold;
    this.blackScore = this._gameState.getScore().black;
  }

  goldScore  = 0;
  blackScore = 0;
}
