import {
    ChangeDetectionStrategy,
    Component,
    input,
    InputSignal, OnInit, signal, WritableSignal,
} from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { BehaviorSubject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'pagination',
    standalone: true,
    imports: [
        AsyncPipe
    ],
    providers: [TuiDestroyService],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
    public gamesOnPage: InputSignal<number> = input.required<number>();
    public gamesCount$: BehaviorSubject<number> = this._filterService.gamesCount$;
    public pagesCount: WritableSignal<number> = signal(0);

    public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

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
        this.currentPage$.next(this.currentPage$.value === 1 ? this.currentPage$.value : this.currentPage$.value - 1);
    }

    public moveRight(): void {
        this.currentPage$.next(this.currentPage$.value === this.pagesCount() ? this.currentPage$.value : this.currentPage$.value + 1);
    }
}
