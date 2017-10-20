
import { HomeComponent } from './components/home/home.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

import { StartGamePageComponent } from './start-game-page/start-game-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        //component: SubmissionPageComponent
        component: StartGamePageComponent
    },
    {
        path: 'scoreboard',
        component: ScoreboardComponent

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
