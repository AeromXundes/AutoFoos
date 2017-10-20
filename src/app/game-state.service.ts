import { Injectable } from '@angular/core';

@Injectable()
export class GameStateService {


  constructor() {};

  eventsList = [];

  addEvent(e) {
    this.eventsList.push( {time: Date.now(), event: e});
  };

  //Those variables are state information used for the RPI's display
  startingPositions = {};
  currentPositions = {gold: {offense: '', defense: ''},  black: {offense: '', defense: ''}};
  startTime;
  score = {gold: 0, black: 0};

  start(pos) {
    this.startingPositions = pos;
    this.currentPositions = pos;
    this.addEvent('start');
    this.startTime = Date.now();
  }
  end() {
    this.addEvent('end');
  }

  getEventsList() {
    return {startingPositions: this.startingPositions, eventsList: this.eventsList};
  };
  /*'goldScored' and 'cancelGoldGoal' are a better interface than eg 'incrementGoldScore()'
  Because it is more  future proof (eg adding sensors or recording time will involve other operations than just an increment)
  */
  goldScored() {
    this.addEvent('g+');
    this.score.gold++;
  };
  cancelGoldGoal() {
    this.addEvent('g-');
    this.score.gold--;
  };
  goldSwappedPositions() {
    this.addEvent('gs');
    var tmp = this.currentPositions.gold.offense;
    this.currentPositions.gold.offense = this.currentPositions.gold.defense;
    this.currentPositions.gold.defense = tmp;
  }
  blackScored() {
    this.addEvent('b+');
    this.score.black++;
  }
  cancelBlackGoal() {
    this.addEvent('b-');
    this.score.black--;
  }
  blackSwappedPositions() {
    this.addEvent('bs');
    var tmp = this.currentPositions.black.offense;
    this.currentPositions.black.offense = this.currentPositions.black.defense;
    this.currentPositions.black.defense = tmp;
  }
  
  totalTimeInPause = 0;
  currentPause = 0;
  pause() {
    this.addEvent('pause');
    this.currentPause = Date.now();
  }
  resume() {
    this.addEvent('resume');
    var thisPause = Date.now() - this.currentPause;
    this.totalTimeInPause += thisPause;
  }
  
  getPlayers() {
    return this.currentPositions;
  }

  getScore() {
    console.log(this.score);
    return this.score;
  }

  getElapsedTime(): {minutes,  seconds} {
    var currentTime = Date.now();
    var delta = currentTime - this.startTime;
    delta -= this.totalTimeInPause;
    delta /= 1000; //convert to seconds
    return {minutes: Math.floor(delta/60), seconds: delta % 60};
  }
  


}
