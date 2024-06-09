import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { GameModel } from '../data/models/game.model';
import { GameDataService } from '../data/services/game-data.service';
import { FilterFormValues } from '../components/filter-form/filter-form-values.type';
import { CategoryDataService } from '../data/services/category-data.service';
import { CategoryModel } from '../data/models/category.model';


@Injectable({
    providedIn: 'root',
})
export class FilterService {
    public event$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public categories$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());
    public gameName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public filters$: Observable<[string, Set<string>, string]> = combineLatest([this.event$, this.categories$, this.gameName$]);
    public gamesCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private _categories: Record<string, string> = {
        'all': '0',
    };

    private _ruToEnCategoryName: Record<string, string> = {
        'Медицина': 'medicine',
        'Аркады': 'arcades',
        'Головоломки': 'puzzles',
        'Приложения': 'applications',
        'Боевики': 'fighters',
        'Физика': 'physics',
        'Математика': 'math',
        'Биомеханика': 'biomechanics',
    };

    constructor(
        private _gameDataService: GameDataService,
        private _categoryDataService: CategoryDataService
    ) {
        this._categoryDataService.getAllCategories()
            .pipe(
                tap((categories: CategoryModel[]) => {
                    categories.forEach((category: CategoryModel) => {
                        this._categories[this._ruToEnCategoryName[category.name]] = category.id;
                    });
                })
            )
            .subscribe();
    }

    public filterGames(): Observable<GameModel[]> {
        return this.filters$
            .pipe(
                switchMap(() => this._gameDataService.getAllGames()),
                map((games: GameModel[]) => this.filterGamesByEvent(games)),
                map((games: GameModel[]) => this.filterGamesByCategories(games)),
                map((games: GameModel[]) => this.filterGamesByGameName(games)),
                tap((games: GameModel[]) => this.gamesCount$.next(games.length))
            );
    }

    public changeEvent(semesterId: string): void {
        this.event$.next(semesterId);
    }

    public changeCategories(filterFormValues: Partial<FilterFormValues>): void {
        for (const [key, value] of Object.entries(filterFormValues)) {
            value
                ? this.addCategory(this._categories[key])
                : this.deleteCategory(this._categories[key]);
        }
    }

    public changeGameName(gameName: string): void {
        this.gameName$.next(gameName);
    }

    private addCategory(filter: string): void {
        this.categories$.next(this.categories$.value.add(filter));
    }

    private deleteCategory(filter: string): void {
        const currentFilters: Set<string> = this.categories$.value;
        currentFilters.delete(filter);
        this.categories$.next(currentFilters);
    }

    private filterGamesByCategories(games: GameModel[]): GameModel[] {
        return this.categories$.value.size === 0 || this.categories$.value.has(this._categories['all'])
            ? games
            : games.filter((game: GameModel) => {
                return this.categories$.value.has(game.categoryId);
            });
    }

    private filterGamesByEvent(games: GameModel[]): GameModel[] {
        return this.event$.value === ''
            ? games
            : games.filter((game: GameModel) => {
                return game.semesterId === this.event$.value;
            });
    }

    private filterGamesByGameName(games: GameModel[]): GameModel[] {
        return this.gameName$.value === ''
            ? games
            : games.filter((game: GameModel) => {
                return game.name.includes(this.gameName$.value.trim());
            });
    }
}
