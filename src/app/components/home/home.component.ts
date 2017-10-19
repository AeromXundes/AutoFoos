import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../../game-state.service'
import { ElectronService } from '../../providers/electron.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public goldScore = 0;
  public blackScore = 0;
  private myPriv: boolean;

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

  addGoldScore() {
    this._gameState.goldScored();
    this.goldScore = this._gameState.getScore().gold;
  }

  subGoldScore() {
    this._gameState.cancelGoldGoal();
    this.goldScore = this._gateState.getScore().gold;
  }

  addBlackScore() {
    this._gameState.blackScored();
    this.blackScore = this._gameState.getScore().black;
  }

  subBlackScore() {
    this._gameState.cancelBlackGoal();
    this.blackScore = this._gameState.getScore().black;
  }

}
