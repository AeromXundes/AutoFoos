import { Component, OnInit } from '@angular/core';
import { GameStateService  } from '../game-state.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-discard-confirmation',
  templateUrl: './discard-confirmation.component.html',
  styleUrls: ['./discard-confirmation.component.scss']
})
export class DiscardConfirmationComponent implements OnInit {

  constructor(private _gameState: GameStateService, private router: Router) { }

  ngOnInit() {
  }

  discard() {
    this._gameState.reset();
    this.router.navigateByUrl('');
  }
  back() {
    this.router.navigateByUrl('submit');
  }
}
