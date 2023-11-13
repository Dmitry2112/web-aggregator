import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BACKEND_URL_TOKEN } from '../../../../data/tokens/backend-url.token';

@Injectable()
export class GameDataService {
    public games$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(
        private _http: HttpClient,
        @Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string
    ) {
    }

    public getAllGames(): Observable<any> {
        return this._http.get<any>(`${this._backendUrl}/api/games`)
            .pipe(
                tap((games: any) => {
                    this.games$.next(games);
                })
            );
    }

    public addGame(newGame: any): Observable<any> {
        return this._http.post<any>(`${this._backendUrl}/api/games`, newGame);
    }

    // public addGame(newGame: any): Observable<any> {
    //     return this._http.post<any>(`${this._backendUrl}/api/games`, newGame)
    //         .pipe(
    //             tap((game: any) => {
    //                 this._gamesSource$.next([...this._gamesSource$.value, game]);
    //             })
    //         );
    // }
}
