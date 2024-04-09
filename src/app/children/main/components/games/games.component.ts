import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { GameCardComponent } from '../game-card/game-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./styles/games.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, GameCardComponent, AsyncPipe, PaginationComponent]
})
export class GamesComponent implements OnInit {
    public games$: Observable<GameModel[]> = new Observable<GameModel[]>();

    constructor(private _paginationService: PaginationService) {}

    public ngOnInit(): void {
        this.games$ = this._paginationService.paginateGames();
    }
}
