import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/services/game-data.service';
import { Observable } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { GameCardComponent } from '../game-card/game-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./styles/games.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, GameCardComponent, AsyncPipe]
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
