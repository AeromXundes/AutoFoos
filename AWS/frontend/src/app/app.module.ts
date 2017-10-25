import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule,
         MatIconModule, MatSelectModule, MatTabsModule, MatToolbarModule,
         MatInputModule, MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AppRoutingModule } from './app-routing.module';
import { PapaParseModule } from 'ngx-papaparse';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    PapaParseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
