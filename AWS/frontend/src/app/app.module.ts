import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule,
         MatIconModule, MatSelectModule, MatTabsModule, MatToolbarModule,
         MatInputModule, MatTableModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AppRoutingModule } from './app-routing.module';
import { PapaParseModule } from 'ngx-papaparse';
import { PlayerProfileComponent, PlayerProfileDialog } from './components/player-profile/player-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerProfileComponent,
    PlayerProfileDialog
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    PapaParseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerProfileDialog]
})
export class AppModule { }
