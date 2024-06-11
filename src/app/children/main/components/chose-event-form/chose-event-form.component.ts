import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FilterService } from '../../services/filter.service';
import { takeUntil, tap } from 'rxjs';
import { SemesterDataService } from '../../data/services/semester-data.service';
import { SemesterModel } from '../../data/models/semester.model';

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
    public eventsNames: WritableSignal<string[]> = signal([]);

    public choseEventForm: FormGroup = new FormGroup({
        event: new FormControl()
    });

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService,
        private _semesterDataService: SemesterDataService
    ) {}

    public ngOnInit(): void {
        this._semesterDataService.getAllSemesters()
            .pipe(
                tap((semesters: SemesterModel[]) => {
                    semesters.forEach((semester: SemesterModel) => {
                        this.eventsNames.set([...this.eventsNames(), semester.name]);
                        this.choseNamesToChoseIds.set(semester.name, semester.id);
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();

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
