import { Component } from '@angular/core';
import { PlayersListService  } from './players-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ PlayersListService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
