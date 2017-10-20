import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service'

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.scss']
})
export class SubmissionPageComponent implements OnInit {

  constructor(private _gameState: GameStateService) { }

  ngOnInit() {
  }

  submit() {
    this._gameState.resume();
    this._gameState.end();
    console.log(this._gameState.getEventsList());
  }

  discard() {

  }

  cancel() {
    this._gameState.resume();
  }
}
