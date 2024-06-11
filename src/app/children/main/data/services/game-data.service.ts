import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IGameResponseModel } from '../response-models/game.response-model.interface';
import { GameModel } from '../models/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameDataService {
    public games$: BehaviorSubject<GameModel[]> = new BehaviorSubject<GameModel[]>([]);

    constructor(private _http: HttpClient) {}

    public getAllGames(): Observable<GameModel[]> {
        return this._http.get<IGameResponseModel[]>('api/games/getall')
            .pipe(
                map((games: IGameResponseModel[]) => {
                    return games.map((game: IGameResponseModel) => {
                        const gameModel: GameModel = new GameModel();
                        gameModel.fromDto(game);

                        return gameModel;
                    });
                }),
                tap((games: GameModel[]) => {
                    this.games$.next(games);
                })
            );
    }

    public getGameById(id: string): Observable<GameModel> {
        return this._http.get<IGameResponseModel>(`api/games/getbyid/${id}`)
            .pipe(
                map((game: IGameResponseModel) => {
                    const gameModel: GameModel = new GameModel();
                    gameModel.fromDto(game);

                    return gameModel;
                })
            );
    }

    public getGameByUserIdAndSemesterId(userId: string, semesterId: string): Observable<GameModel> {
        return this._http.get<IGameResponseModel>(`team-dist/getProjectByUserSemId/?userId=${userId}&semesterId=${semesterId}`)
            .pipe(
                map((game: IGameResponseModel) => {
                    const gameModel: GameModel = new GameModel();
                    gameModel.fromDto(game);

                    return gameModel;
                })
            );
    }

    public addGame(newGame: GameModel): Observable<IGameResponseModel> {
        return this._http.post<IGameResponseModel>('api/games', newGame.toDto());
    }
}
