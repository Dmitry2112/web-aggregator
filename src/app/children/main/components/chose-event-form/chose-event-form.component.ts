import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FilterService } from '../../services/filter.service';
import { takeUntil, tap } from 'rxjs';

@Component({
    selector: 'chose-event-form',
    standalone: true,
    imports: [
        TuiSelectModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule
    ],
    providers: [TuiDestroyService],
    templateUrl: './chose-event-form.component.html',
    styleUrl: './styles/chose-event-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoseEventFormComponent implements OnInit {
    public choseNamesToChoseIds: Map<string, string> = new Map<string, string>();

    public eventsNames: string[] = [
        'Весна 2023',
        'Осень 2023',
        'Весна 2024'
    ];

    public choseEventForm: FormGroup = new FormGroup({
        event: new FormControl()
    });

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this.choseNamesToChoseIds.set(this.eventsNames[0], '1');
        this.choseNamesToChoseIds.set(this.eventsNames[1], '2');
        this.choseNamesToChoseIds.set(this.eventsNames[2], '3');

        this.choseEventForm.controls['event'].valueChanges
            .pipe(
                tap((eventName: string) => {
                    this._filterService.changeEvent(this.choseNamesToChoseIds.get(eventName) as string);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
