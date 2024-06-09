import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    InputSignal,
    OnInit, Signal,
    signal,
    WritableSignal
} from '@angular/core';
import { GameDataService } from '../../data/services/game-data.service';
import { switchMap, takeUntil, tap } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { AsyncPipe } from '@angular/common';
import { CategoryDataService } from '../../data/services/category-data.service';
import { CategoryModel } from '../../data/models/category.model';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'history-card',
    standalone: true,
    imports: [
        AsyncPipe,
        RouterLink
    ],
    providers: [TuiDestroyService],
    templateUrl: './history-card.component.html',
    styleUrl: './styles/history-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryCardComponent implements OnInit {
    public gameId: InputSignal<string> = input.required<string>();
    public category: WritableSignal<string> = signal('');
    public name: WritableSignal<string> = signal('');
    public routedLink: Signal<string> = computed(() => `/cabinet/about-game/${this.gameId()}`);

    constructor(
        private _gameDataService: GameDataService,
        private _categoryDataService: CategoryDataService,
        private _destroy$: TuiDestroyService,
    ) {}

    public ngOnInit(): void {
        this._gameDataService.getGameById(this.gameId())
            .pipe(
                tap((game: GameModel) => this.name.set(game.name)),
                switchMap((game: GameModel) => {
                    return this._categoryDataService.getCategoryById(game.categoryId);
                }),
                tap((category: CategoryModel) => this.category.set(category.name)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
