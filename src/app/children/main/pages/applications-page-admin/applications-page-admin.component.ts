import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesComponent } from '../../components/games/games.component';
import { TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiDataListWrapperModule, TuiCheckboxLabeledModule, TuiCarouselModule, TuiIslandModule } from '@taiga-ui/kit';
import { ChoseEventFormComponent } from '../../components/chose-event-form/chose-event-form.component';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { FilterService } from '../../services/filter.service';
import { takeUntil, tap } from 'rxjs';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { HistoryComponent } from '../../components/history/history.component';

import { BehaviorSubject, Observable } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { SearchComponent } from '../../components/search/search.component';
import { GameCardAdminComponent } from '../../components/game-card-admin/game-card-admin.component';

@Component({
    selector: 'applications-page-admin',
    templateUrl: './applications-page-admin.component.html',
    styleUrls: ['./styles/applications-page-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        TuiSelectModule,
        TuiCheckboxLabeledModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        GamesComponent,
        TuiCarouselModule,
        TuiIslandModule,
        ChoseEventFormComponent,
        FilterFormComponent,
        HistoryComponent,
        NgIf, NgFor, GameCardAdminComponent, AsyncPipe, PaginationComponent, SearchComponent
    ],
    providers: [TuiDestroyService]
})
export class ApplicationsPageAdminComponent implements OnInit {
    public events: string[] = [
        'Весна 2024',
        'Осень 2023'
    ];

    public ratingFilters: string[] = [
        'По возрастанию рейтинга',
        'По убыванию рейтнга'
    ];

    public chooseEvent: FormControl<string> = new FormControl();
    public chooseRatingFilter: FormControl<string> = new FormControl();

    public event: WritableSignal<string | undefined> = signal('');

    public eventIdsToEventNames: Map<string, string> = new Map<string, string>();

    public eventsNames: string[] = [
        'Весна 2023',
        'Осень 2023',
        'Весна 2024'
    ];

    public games$: Observable<GameModel[]> = new Observable<GameModel[]>();
    public gamesCount$: BehaviorSubject<number> = this._filterService.gamesCount$;

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService,
        private _paginationService: PaginationService,
    ) {}

    public ngOnInit(): void {
        this.eventIdsToEventNames.set('1', this.eventsNames[0]);
        this.eventIdsToEventNames.set('2', this.eventsNames[1]);
        this.eventIdsToEventNames.set('3', this.eventsNames[2]);

        this._filterService.event$
            .pipe(
                tap((eventId: string) => {
                    this.event.set(this.eventIdsToEventNames.get(eventId));
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();

        this.games$ = this._paginationService.paginateGames();
    }
}
