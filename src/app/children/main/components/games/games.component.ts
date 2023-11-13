import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/services/game-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./styles/games.component.scss']
})
export class GamesComponent implements OnInit {
    public games$: Observable<any> = new Observable<any>();
    constructor(private _gameDataService: GameDataService) {
    }

    public ngOnInit(): void {
        this.games$ = this._gameDataService.games$.asObservable();
        this._gameDataService.getAllGames().subscribe();
    }
}
