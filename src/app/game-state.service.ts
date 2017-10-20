import { Injectable } from '@angular/core';

@Injectable()
export class GameStateService {


  constructor() {};

  eventsList = [];

  addEvent(e) {
    this.eventsList.push( {time: Date.now(), event: e});
  };

  //Those variables are state information used for the RPI's display
  startingPositions = {gold: {offense: '', defense: ''},  black: {offense: '', defense: ''}};
  currentPositions = {gold: {offense: '', defense: ''},  black: {offense: '', defense: ''}};
  startTime;
  score = {gold: 0, black: 0};

  start() {
    this.addEvent('start');
    this.startTime = Date.now();
  }
  end() {
    this.addEvent('end');
    console.log(this.getEventsList());
  }
  
  setGoldOffense(name){
    this.startingPositions.gold.offense = name;
    this.currentPositions.gold.offense = name;
  }
  setGoldDefense(name){
    this.startingPositions.gold.defense = name;
    this.currentPositions.gold.defense = name;
  }
  setBlackOffense(name){
    this.startingPositions.black.offense = name;
    this.currentPositions.black.offense = name;
  }
  setBlackDefense(name){
    this.startingPositions.black.defense = name;
    this.currentPositions.black.defense = name;
  }

  getEventsList() {
    return {startingPositions: this.startingPositions, eventsList: this.eventsList};
  };
  
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
