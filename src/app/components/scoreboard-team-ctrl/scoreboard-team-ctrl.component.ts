import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { GameStateService  } from '../../game-state.service'

@Component({
  selector: 'app-scoreboard-team-ctrl',
  templateUrl: './scoreboard-team-ctrl.component.html',
  styleUrls: ['./scoreboard-team-ctrl.component.scss']
})
export class ScoreboardTeamCtrlComponent implements OnInit {

  private ipcRenderer = window.require('electron').ipcRenderer;

  private currentScore: number;

  @Input() teamName: string;
  @Input()
  get score(): number {
    return this.currentScore;
  }

  @Output()
  scoreChange = new EventEmitter();

  constructor(private _gameState: GameStateService, private ngZone: NgZone) {}

  ngOnInit() {
    console.log('register' + this.teamName);
    this.ipcRenderer.send('register'+this.teamName);
    if (this.teamName === 'Gold') {
      this.ipcRenderer.on('gs', (event, arg) => { console.log('sensor: gold scored'); this.addScore()});
    }
    else if (this.teamName === 'Black') {
      this.ipcRenderer.on('bs', (event, arg) => { console.log('sensor: black scored'); this.addScore();});
    }
    this.setPlayers();
  }

  offensePlayer = '';
  defensePlayer = '';

  setPlayers() {
    if (this.teamName === 'Gold') {
      this.offensePlayer = this._gameState.getPlayers().gold.offense;
      this.defensePlayer = this._gameState.getPlayers().gold.defense;
    }
    else if (this.teamName === 'Black') {
      this.offensePlayer = this._gameState.getPlayers().black.offense;
      this.defensePlayer = this._gameState.getPlayers().black.defense;
    }
    else {
      throw 'bad team name';
    }
  }

  swap() {
    if (this.teamName === 'Gold') {
      this._gameState.goldSwappedPositions();
    }
    else if (this.teamName === 'Black') {
      this._gameState.blackSwappedPositions();
    }
    else {
      throw 'Bad team name';
    }
    this.setPlayers();
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
