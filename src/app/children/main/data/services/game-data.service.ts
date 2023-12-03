import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BACKEND_URL_TOKEN } from '../../../../data/tokens/backend-url.token';
import { IGameResponseModel } from '../response-models/game.response-model.interface';
import { IGameRequestModel } from '../request-models/game.request-model.interface';

@Injectable()
export class GameDataService {
    public games$: BehaviorSubject<IGameResponseModel[]> = new BehaviorSubject<IGameResponseModel[]>([]);

    constructor(
        private _http: HttpClient,
        @Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string
    ) {
    }

    public getAllGames(): Observable<IGameResponseModel[]> {
        return this._http.get<IGameResponseModel[]>(`${this._backendUrl}/api/games`)
            .pipe(
                tap((games: IGameResponseModel[]) => {
                    this.games$.next(games);
                })
            );
    }

    public addGame(newGame: IGameRequestModel): Observable<IGameResponseModel> {
        return this._http.post<IGameResponseModel>(`${this._backendUrl}/api/games`, newGame);
    }
}
