import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game-page',
  templateUrl: './start-game-page.component.html',
  styleUrls: ['./start-game-page.component.scss']
})
export class StartGamePageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  startGame() {
    this.router.navigateByUrl('scoreboard');
  }
}
