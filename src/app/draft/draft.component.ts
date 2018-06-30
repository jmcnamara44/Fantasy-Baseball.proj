import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css'],
  providers: [PlayerService, TeamService]
})
export class DraftComponent implements OnInit {
  teams;
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(dataLastEmittedFromObserver => {
      this.teams = dataLastEmittedFromObserver;
      console.log(this.teams);
    })
  }

  players = this.playerService.playerList

  // each team should have exacty 10 players, with 7 free agents
  totalPlayers = [];
  freeAgents = [];
  randomPlayerArray() {
    for(var i = 0; i<8; i++) {
      if (this.totalPlayers.length<80) {
        var randomPlayer = this.players[Math.floor(Math.random()*this.players.length)];
        if(this.totalPlayers.indexOf(randomPlayer) == -1) {
          this.totalPlayers.push(randomPlayer);
          this.teams[i].push(randomPlayer)
        } else {
          i -=1;
        }
      } else {
        for(var x = 0; x<this.players.length; x++) {
          if (this.totalPlayers.indexOf(this.players[x]) == -1) {
            this.freeAgents.push(this.players[x]);
          }
        }
        return this.teams;
      }
      if (i === 7) {
        i = -1;
      }
    }
  }
}
