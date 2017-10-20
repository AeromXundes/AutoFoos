import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service'
import { GameStateService  } from '../../game-state.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public goldScore = this._gameState.getScore().gold;
  public blackScore = this._gameState.getScore().black;

  constructor(private _gameState: GameStateService, private router: Router) { }

  ngOnInit() {
  }
  end() {
    this._gameState.pause();
    this.router.navigateByUrl('submit');
  }
}
