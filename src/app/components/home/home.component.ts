import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  addGoldScore() {
    ++this.goldScore;
  }

  subGoldScore() {
    --this.goldScore;
  }

  addBlackScore() {
    ++this.blackScore;
  }

  subBlackScore() {
    --this.blackScore;
  }

}
