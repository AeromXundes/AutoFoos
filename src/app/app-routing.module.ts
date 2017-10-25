
import { HomeComponent } from './components/home/home.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { DiscardConfirmationComponent } from './discard-confirmation/discard-confirmation.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { PlayerEditorComponent } from './components/player-editor/player-editor.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

import { StartGamePageComponent } from './start-game-page/start-game-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: StartGamePageComponent
    },
    {
        path: 'player-editor',
        component: PlayerEditorComponent
    },
    {
        path: 'scoreboard',
        component: ScoreboardComponent
    },
    {
        path: 'submit',
        component: SubmissionPageComponent
    },
    {
        path: 'discard-confirmation',
        component: DiscardConfirmationComponent
    },
    {
        path: 'hall-of-fame',
        component: HallOfFameComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
