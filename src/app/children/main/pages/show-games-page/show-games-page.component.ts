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

@Component({
    selector: 'show-games-page',
    templateUrl: './show-games-page.component.html',
    styleUrls: ['./styles/show-projects-page.component.scss'],
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
        HistoryComponent
    ],
    providers: [TuiDestroyService]
})
export class ShowGamesPageComponent implements OnInit {
    public events: string[] = [
        'Весна 2024',
        'Осень 2023'
    ];

    public event: WritableSignal<string | undefined> = signal('');

    public eventIdsToEventNames: Map<string, string> = new Map<string, string>();

    public eventsNames: string[] = [
        'Весна 2023',
        'Осень 2023',
        'Весна 2024'
    ];

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this.eventIdsToEventNames.set('1', this.eventsNames[0]);
        this.eventIdsToEventNames.set('08a675d0-7931-4a6e-8fc7-d1ffc3d30798', this.eventsNames[1]);
        this.eventIdsToEventNames.set('91cfce5a-f061-4b9c-a3f1-fa2e1b39aaba', this.eventsNames[2]);

        this._filterService.event$
            .pipe(
                tap((eventId: string) => {
                    this.event.set(this.eventIdsToEventNames.get(eventId));
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
