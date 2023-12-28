import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/services/game-data.service';
import { Observable } from 'rxjs';
import { IGameResponseModel } from '../../data/response-models/game.response-model.interface';
import { GameModel } from '../../data/models/game.model';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./styles/games.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {
    public games$: Observable<GameModel[]> = new Observable<GameModel[]>();
    constructor(private _gameDataService: GameDataService) {
    }

    public ngOnInit(): void {
        this.games$ = this._gameDataService.games$.asObservable();
        this._gameDataService.getAllGames().subscribe();
    }
}
