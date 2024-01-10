import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThemeModel } from '../models/theme.model';
import { IThemeResponseModel } from '../response-models/theme.response-model.interface';

@Injectable()
export class ThemeDataService {
    public themes$: BehaviorSubject<ThemeModel[]> = new BehaviorSubject<ThemeModel[]>([]);

    constructor(private _http: HttpClient) {}

    public getAllThemes(): Observable<ThemeModel[]> {
        return this._http.get<IThemeResponseModel[]>('themes')
            .pipe(
                map((themes: IThemeResponseModel[]) => {
                    return themes.map((theme: IThemeResponseModel) => {
                        const themeModel: ThemeModel = new ThemeModel();
                        themeModel.fromDto(theme);

                        return themeModel;
                    });
                }),
                tap((themes: ThemeModel[]) => {
                    this.themes$.next(themes);
                })
            );
    }
}
