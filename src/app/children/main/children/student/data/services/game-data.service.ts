import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BACKEND_URL_TOKEN } from '../../../../../../data/tokens/backend-url.token';

@Injectable()
export class GameDataService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _gamesSource$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public games$: Observable<any> = this._gamesSource$.asObservable();

    constructor(
        private _http: HttpClient,
        @Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string
    ) {
    }

    public getAllGames(): Observable<any> {
        return this._http.get<any>(`${this._backendUrl}/api/games`)
            .pipe(
                tap((games: any) => {
                    this._gamesSource$.next(games);
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
