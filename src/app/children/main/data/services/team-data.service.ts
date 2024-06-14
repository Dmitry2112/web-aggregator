import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TeammateModel } from '../models/teammate.model';
import { ITeammateResponseModel } from '../response-models/teammate.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class TeamDataService {
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
}
