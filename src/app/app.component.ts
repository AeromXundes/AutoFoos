import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import {GameStateService} from './game-state.service';
import {PlayersListService} from './players-list.service';
import { AwsCommService} from './aws-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameStateService,  PlayersListService, AwsCommService]
})
export class AppComponent {
  constructor(public electronService: ElectronService) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
