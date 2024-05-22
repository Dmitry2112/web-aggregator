import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { GameModel } from '../data/models/game.model';
import { GameDataService } from '../data/services/game-data.service';
import { FilterFormValues } from '../components/filter-form/filter-form-values.type';


@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public event$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public themes$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());
    public filters$: Observable<[string, Set<string>]> = combineLatest([this.event$, this.themes$]);
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
                map((games: GameModel[]) => this.filterGamesByEvent(games)),
                map((games: GameModel[]) => this.filterGamesByThemes(games)),
                tap((games: GameModel[]) => this.gamesCount$.next(games.length))
            );
    }

    public changeEvent(semesterId: string): void {
        this.event$.next(semesterId);
    }

    public changeThemes(filterFormValues: Partial<FilterFormValues>): void {
        for (const [key, value] of Object.entries(filterFormValues)) {
            value
                ? this.addTheme(this._themes[key])
                : this.deleteTheme(this._themes[key]);
        }
    }

    private addTheme(filter: string): void {
        this.themes$.next(this.themes$.value.add(filter));
    }

    private deleteTheme(filter: string): void {
        const currentFilters: Set<string> = this.themes$.value;
        currentFilters.delete(filter);
        this.themes$.next(currentFilters);
    }

    private filterGamesByThemes(games: GameModel[]): GameModel[] {
        return this.themes$.value.size === 0 || this.themes$.value.has(this._themes['all'])
            ? games
            : games.filter((game: GameModel) => {
                return this.themes$.value.has(game.theme);
            });
    }

    private filterGamesByEvent(games: GameModel[]): GameModel[] {
        return this.event$.value === ''
            ? games
            : games.filter((game: GameModel) => {
                return game.semesterId === this.event$.value;
            });
    }
}
