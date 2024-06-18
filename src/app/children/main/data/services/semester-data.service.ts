import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ISemesterResponseModel } from '../response-models/semester.response-model.interface';
import { SemesterModel } from '../models/semester.model';

@Injectable({
    providedIn: 'root'
})
export class SemesterDataService {
    constructor(private _http: HttpClient) {}

    public getAllSemesters(): Observable<SemesterModel[]> {
        return this._http.get<ISemesterResponseModel[]>('semesters')
            .pipe(
                map((semesters: ISemesterResponseModel[]) => {
                    return semesters.map((semester: ISemesterResponseModel) => {
                        const semesterModel: SemesterModel = new SemesterModel();
                        semesterModel.fromDto(semester);

                        return semesterModel;
                    });
                }),
                map(this.sortSemestersByYear)
            );
    }

    private sortSemestersByYear(semesters: SemesterModel[]): SemesterModel[] {
        return semesters.sort((a: SemesterModel, b: SemesterModel) => {
            const yearA: number = Number.parseInt(a.name.split(' ')[1]);
            const yearB: number = Number.parseInt(b.name.split(' ')[1]);

            return  yearA - yearB;
        });
    }
}
