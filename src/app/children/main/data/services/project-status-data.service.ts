import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProjectStatusModel } from '../models/project-status.model';
import { IProjectStatusResponseModel } from '../response-models/project-status.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class ProjectStatusDataService {
    constructor(private _http: HttpClient) {}

    public getAllStatuses(): Observable<ProjectStatusModel[]> {
        return this._http.get<ProjectStatusModel[]>('statuses')
            .pipe(
                map((projectStatuses: IProjectStatusResponseModel[]) => {
                    return projectStatuses.map((projectStatus: IProjectStatusResponseModel) => {
                        const projectStatusModel: ProjectStatusModel = new ProjectStatusModel();
                        projectStatusModel.fromDto(projectStatus);

                        return projectStatusModel;
                    });
                })
            );
    }

    public getProjectStatusById(id: string): Observable<ProjectStatusModel> {
        return this._http.get<ProjectStatusModel>(`statuses/${id}`)
            .pipe(
                map((projectStatus: IProjectStatusResponseModel) => {
                    const projectStatusModel: ProjectStatusModel = new ProjectStatusModel();
                    projectStatusModel.fromDto(projectStatus);

                    return projectStatusModel;
                }),
            );
    }
}
