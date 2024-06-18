import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { TeammateModel } from '../models/teammate.model';
import { ITeammateResponseModel } from '../response-models/teammate.response-model.interface';
import { TeamModel } from '../models/team.model';
import { ITeamResponseModel } from '../response-models/team.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class TeamDataService {
    public teamId: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private _http: HttpClient) {}

    public getTeamById(id: string): Observable<TeammateModel[]> {
        return this._http.get<ITeammateResponseModel[]>(`team-dist/getteam/${id}`)
            .pipe(
                map((teammates: ITeammateResponseModel[]) => {
                    return teammates.map((teammate: ITeammateResponseModel) => {
                        const teammateModel: TeammateModel = new TeammateModel();
                        teammateModel.fromDto(teammate);

                        return teammateModel;
                    });
                }),
            );
    }

    public createTeam(name: string): Observable<TeamModel> {
        return this._http.post<ITeamResponseModel>('api/teams', { name: name })
            .pipe(
                map((team: ITeamResponseModel) => {
                    const teamModel: TeamModel = new TeamModel();
                    teamModel.fromDto(team);

                    return teamModel;
                }),
                tap((team: TeamModel) => {
                    this.teamId.next(team.id);
                })
            );
    }

    public addTeamIdForStudents(studentsData: {semesterId: string; teamId: string; studentsIds: string[]}): Observable<void> {
        return this._http.patch<void>('team-dist/addTeamIdForStudents', studentsData);
    }
}
