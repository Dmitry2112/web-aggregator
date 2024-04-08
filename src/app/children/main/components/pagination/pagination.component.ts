import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    InputSignal, Signal,
    signal,
    WritableSignal
} from '@angular/core';

@Component({
    selector: 'pagination',
    standalone: true,
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
    public gamesCount: InputSignal<number> = input.required<number>();
    public gamesOnPage: InputSignal<number> = input.required<number>();

    public pagesCount: Signal<number> = computed(() => Math.ceil(this.gamesCount() / this.gamesOnPage()));
    public currentPage: WritableSignal<number> = signal(1);

    public moveLeft(): void {
        this.currentPage.update((value: number) => value === 1 ? value : value - 1);
    }

    public moveRight(): void {
        this.currentPage.update((value: number) => value === this.pagesCount() ? value : value + 1);
    }
}
