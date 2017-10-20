import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameStateService  } from '../../game-state.service'

@Component({
  selector: 'app-scoreboard-team-ctrl',
  templateUrl: './scoreboard-team-ctrl.component.html',
  styleUrls: ['./scoreboard-team-ctrl.component.scss']
})
export class ScoreboardTeamCtrlComponent implements OnInit {

  private currentScore: number;

  @Input() teamName: string;
  @Input()
  get score(): number {
    return this.currentScore;
  }

  @Output()
  scoreChange = new EventEmitter();

  constructor(private _gameState: GameStateService) { }

  ngOnInit() {
  }

  set score(val: number) {
    this.currentScore = val;
    this.scoreChange.emit(this.currentScore);
  }

  addScore() {
    if (this.score < 8) {
      if (this.teamName === 'Gold') {
        this._gameState.goldScored();
      }
      else if (this.teamName === 'Black') {
        this._gameState.blackScored();
      }
      else {
        throw 'problem with team name';
      }
      ++this.score;
    }
  }

  subScore() {
    if (this.score > 0) {
      if (this.teamName === 'Gold') {
        this._gameState.cancelGoldGoal();
      }
      else if (this.teamName === 'Black') {
        this._gameState.cancelBlackGoal();
      }
      else {
        throw 'problem with team name';
      }
      --this.score;
    }
  }
}
