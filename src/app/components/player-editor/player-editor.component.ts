import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersListService } from '../../players-list.service'

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent implements OnInit {
  public playerName: string;

  constructor(private playerService: PlayersListService, private router: Router) { }

  ngOnInit() {
  }

  back(): void {
    this.router.navigateByUrl('/');
  }

  onSubmit(): void {
    this.playerService.addPlayer(this.playerName);
    this.router.navigateByUrl('/');
  }

}
