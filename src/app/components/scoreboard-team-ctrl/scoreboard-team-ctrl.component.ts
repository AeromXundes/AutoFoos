import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  set score(val: number) {
    this.currentScore = val;
    this.scoreChange.emit(this.currentScore);
  }

  addScore() {
    if (this.score < 8) {
      ++this.score;
    }
  }

  subScore() {
    if (this.score > 0) {
      --this.score;
    }
  }
}
