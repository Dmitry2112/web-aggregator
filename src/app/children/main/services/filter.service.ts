import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { GameModel } from '../data/models/game.model';
import { GameDataService } from '../data/services/game-data.service';
import { FilterFormValues } from '../components/filter-form/filter-form-values.type';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public filters$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());
    public gamesCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private _themes: Record<string, string> = {
        'all': '0',
        'math': '1',
        'medicine': '2',
        'physics': '3',
        'arcades': '4',
        'fighters': '5'
    };

    constructor(
        private _gameDataService: GameDataService
    ) {}

    public filterGames(): Observable<GameModel[]> {
        return this.filters$
            .pipe(
                switchMap(() => this._gameDataService.getAllGames()),
                map((games: GameModel[]) => this.filterGamesByThemes(games)),
                tap((games: GameModel[]) => this.gamesCount$.next(games.length))
            );
    }

    public changeFilters(filterFormValues: Partial<FilterFormValues>): void {
        for (const [key, value] of Object.entries(filterFormValues)) {
            value
                ? this.addFilter(this._themes[key])
                : this.deleteFilter(this._themes[key]);
        }
    }

    private addFilter(filter: string): void {
        this.filters$.next(this.filters$.value.add(filter));
    }

    private deleteFilter(filter: string): void {
        const currentFilters: Set<string> = this.filters$.value;
        currentFilters.delete(filter);
        this.filters$.next(currentFilters);
    }

    private filterGamesByThemes(games: GameModel[]): GameModel[] {
        return this.filters$.value.size === 0 || this.filters$.value.has(this._themes['all'])
            ? games
            : games.filter((game: GameModel) => {
                return this.filters$.value.has(game.theme);
            });
    }
}
