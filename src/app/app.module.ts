import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatGridListModule, MatSelectModule, MatTabsModule, MatFormFieldModule, MatButtonModule} from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';


import { ElectronService } from './providers/electron.service';
import { StartGamePageComponent } from './start-game-page/start-game-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffensePlayerComponent } from './offense-player/offense-player.component';
import { DefensePlayerComponent } from './defense-player/defense-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartGamePageComponent,
    OffensePlayerComponent,
    DefensePlayerComponent
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
    BrowserAnimationsModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
