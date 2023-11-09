import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GameDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    // public getGame(gameId: string): Observable<any> {
    //     return this._http.get<any>(`api/games/${gameId}`);
    // }

    public addGame(newGame: any): Observable<any> {
        return this._http.post<any>(`api/games`, newGame);
    }
}
