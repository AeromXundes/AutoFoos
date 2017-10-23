import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule,
         MatIconModule, MatSelectModule, MatTabsModule, MatToolbarModule,
         MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

import { AppRoutingModule } from './app-routing.module';


import { ElectronService } from './providers/electron.service';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { ScoreboardTeamCtrlComponent } from './components/scoreboard-team-ctrl/scoreboard-team-ctrl.component';
import { StartGamePageComponent } from './start-game-page/start-game-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { DiscardConfirmationComponent } from './discard-confirmation/discard-confirmation.component';
import { PlayerEditorComponent } from './components/player-editor/player-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionPageComponent,
    ScoreboardComponent,
    ScoreboardTeamCtrlComponent,
    StartGamePageComponent,
    PlayerSelectionComponent,
    DiscardConfirmationComponent,
    PlayerEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
