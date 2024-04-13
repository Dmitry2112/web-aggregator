import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { RangeGames } from '../types/range-games.type';
import { GameModel } from '../data/models/game.model';
import { FilterService } from './filter.service';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    public rangeGames$: BehaviorSubject<RangeGames> = new BehaviorSubject<RangeGames>([0, 5]);

    constructor(private _filterService: FilterService) {}

    public paginateGames(): Observable<GameModel[]> {
        return this.rangeGames$
            .pipe(
                switchMap(() => this._filterService.filterGames()),
                map((games: GameModel[]) => {
                    return games.slice(this.rangeGames$.value[0], this.rangeGames$.value[1]);
                })
            );
    }

    public changeRange(currentPage: number, gamesOnPage: number): void {
        const newRange: RangeGames = [(currentPage - 1) * gamesOnPage, currentPage * gamesOnPage];
        this.rangeGames$.next(newRange);
    }
}
