import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { ITeamDistResponseModel } from '../response-models/team-dist.response-model.interface';
import { RoleModel } from '../models/role.model';
import { IRoleResponseModel } from '../response-models/role.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class RoleDataService {
    constructor(private _http: HttpClient) {}

    public getAllRoles(): Observable<RoleModel[]> {
        return this._http.get<IRoleResponseModel[]>('team-roles')
            .pipe(
                map((roles: IRoleResponseModel[]) => {
                    return roles.map((role: IRoleResponseModel) => {
                        const roleModel: RoleModel = new RoleModel();
                        roleModel.fromDto(role);

                        return roleModel;
                    });
                })
            );
    }

    public postTeamDist(teamDistData: {userId: string; roleId: string; semesterId: string}): Observable<unknown> {
        return this._http.post<unknown>('team-dist', teamDistData);
    }

    public getRoleByUserIdAndSemesterId(userId: string, semesterId: string): Observable<RoleModel> {
        return this._http.get<ITeamDistResponseModel[]>(`team-dist/getrolebyusersemid/?userId=${userId}&semesterId=${semesterId}`)
            .pipe(
                switchMap((teamDist: ITeamDistResponseModel[]) => {
                    return this.getRoleById(teamDist[0].roleId);
                })
            );
    }

    private getRoleById(id: string): Observable<RoleModel> {
        return this._http.get<IRoleResponseModel>(`team-roles/${id}`)
            .pipe(
                map((role: IRoleResponseModel) => {
                    const roleModel: RoleModel = new RoleModel();
                    roleModel.fromDto(role);

                    return roleModel;
                })
            );
    }
}
