import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public goldScore = 0;
  public blackScore = 0;

  constructor() { }

  ngOnInit() {
  }

}
