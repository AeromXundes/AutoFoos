import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCardModule, MatGridListModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

import { AppRoutingModule } from './app-routing.module';


import { ElectronService } from './providers/electron.service';
import { ScoreboardTeamCtrlComponent } from './components/scoreboard-team-ctrl/scoreboard-team-ctrl.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ScoreboardTeamCtrlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
