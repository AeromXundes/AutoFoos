import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.scss']
})
export class SubmissionPageComponent implements OnInit {

  constructor(private _gameState: GameStateService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this._gameState.resume();
    this._gameState.end();
    this.router.navigateByUrl('');
  }

  discard() {
    this.router.navigateByUrl('');
  }

  cancel() {
    this._gameState.resume();
    this.router.navigateByUrl('scoreboard');
  }
}
