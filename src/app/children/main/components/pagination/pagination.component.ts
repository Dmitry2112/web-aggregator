import {
    ChangeDetectionStrategy,
    Component, computed,
    input,
    InputSignal, OnInit, Signal, signal, WritableSignal,
} from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { BehaviorSubject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'pagination',
    standalone: true,
    imports: [
        AsyncPipe,
        NgClass
    ],
    providers: [TuiDestroyService],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
    // TODO: решить проблему с подпиской на текущую страницу

    public gamesOnPage: InputSignal<number> = input.required<number>();

    public gamesCount$: BehaviorSubject<number> = this._filterService.gamesCount$;
    public pagesCount: WritableSignal<number> = signal(0);
    public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    public curPage: WritableSignal<number> = signal(1);
    public leftDisabled: Signal<boolean> = computed(() => this.curPage() === 1);
    public rightDisabled: Signal<boolean> = computed(() => this.curPage() === this.pagesCount());

    constructor(
        private _paginationService: PaginationService,
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this.gamesCount$
            .pipe(
                tap((count: number) => this.pagesCount.set(Math.ceil(this.gamesCount$.value / this.gamesOnPage()))),
                takeUntil(this._destroy$)
            )
            .subscribe();

        this.currentPage$
            .pipe(
                distinctUntilChanged(),
                tap(() => this._paginationService.changeRange(this.currentPage$.value, this.gamesOnPage())),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public moveLeft(): void {
        this.curPage.update((value: number) => value === 1 ? value : value - 1);
        this.currentPage$.next(this.currentPage$.value === 1 ? this.currentPage$.value : this.currentPage$.value - 1);
    }

    public moveRight(): void {
        this.curPage.update((value: number) => value === this.pagesCount() ? value : value + 1);
        this.currentPage$.next(this.currentPage$.value === this.pagesCount() ? this.currentPage$.value : this.currentPage$.value + 1);
    }
}
