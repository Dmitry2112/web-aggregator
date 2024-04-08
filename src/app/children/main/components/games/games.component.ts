import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { GameCardComponent } from '../game-card/game-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FilterService } from '../../services/filter.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./styles/games.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, GameCardComponent, AsyncPipe, PaginationComponent]
})
export class GamesComponent implements OnInit {
    public games$: BehaviorSubject<GameModel[]> = new BehaviorSubject<GameModel[]>([]);
    constructor(private _filterService: FilterService) {}

    public ngOnInit(): void {
        this.games$ = this._filterService.filteredGames$;
    }
}
