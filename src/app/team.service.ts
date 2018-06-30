import { Injectable } from '@angular/core';
import { Team } from './models/team.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class TeamService {
  teams: FirebaseListObservable<any[]> = null;
  userId: string = "";

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
        this.teams = database.list(`teams/${this.userId}`);
        // console.log(this.userId);
        this.teams.subscribe(team => {
          //console.log(team);
        })
      }
    })
  }

  addTeam(newTeam: Team) {
    this.teams.push(newTeam);
  }

  getTeams() {
    if(!this.userId) return;
    this.teams = this.database.list(`teams/${this.userId}`);
    return this.teams;
  }

  getTeamById(teamId: string) {
    return this.database.object(`teams/${this.userId}/${teamId}`);
  }

  updateTeam(localUpdatedTeam) {
    let teamEntryInFirebase = this.getTeamById(localUpdatedTeam.$key);
    teamEntryInFirebase.update({teamName: localUpdatedTeam.teamName})
  }

  deleteTeam(localTeamToDelete) {
    let teamEntryInFirebase = this.getTeamById(localTeamToDelete.$key);
    teamEntryInFirebase.remove();
  }

}
