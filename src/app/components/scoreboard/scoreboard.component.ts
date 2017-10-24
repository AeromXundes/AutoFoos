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

  time = {value: '00:00'};

  setTime(obj, time) {
    var m = obj.minutes.toFixed(0);
    if (obj.minutes < 10) {
      m = '0' + m;
    }
    var s = obj.seconds.toFixed(0);
    if (obj.seconds < 10) {
      s = '0' + s;
    }

    time.value = m + ':' + s;
    console.log('time.value is now');
    console.log(obj);
    console.log(time.value);
  }
  

  getOnTimeout() {
    var state = this._gameState;
    var time = this.time;
    var setter = this.setTime;
    return function() {
      console.log('timer!');
      var t = state.getElapsedTime();
      t.seconds = Math.floor(t.seconds);
      console.log(t);
      setter(t, time);
    }
  }

  onTimeout = this.getOnTimeout();

  end() {
    clearInterval(this.timer);
    this._gameState.pause();
    this.router.navigateByUrl('submit');
  }

  timer = setInterval(this.onTimeout, 100);
}
