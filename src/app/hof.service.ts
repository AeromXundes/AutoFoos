import { Injectable } from '@angular/core';

@Injectable()
export class HofService {

  constructor() { }

  subscribers = [];

  send () {
    for (var i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i]();
    }
  }

  register(a) {
    this.subscribers.push(a);
  }

}

