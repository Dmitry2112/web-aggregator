import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { FilterService } from '../../services/filter.service';
import { takeUntil, tap } from 'rxjs';
import { IFilterForm } from './filter-form.interface';
import { FilterFormValues } from './filter-form-values.type';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
    selector: 'filter-form',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TuiCheckboxLabeledModule
    ],
    providers: [TuiDestroyService],
    templateUrl: './filter-form.component.html',
    styleUrl: './styles/filter-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterFormComponent implements OnInit {
    public filterForm: FormGroup<IFilterForm> = new FormGroup<IFilterForm>({
        all: new FormControl(false, { nonNullable: true }),
        math: new FormControl(false, { nonNullable: true }),
        medicine: new FormControl(false, { nonNullable: true }),
        physics: new FormControl(false, { nonNullable: true }),
        biomechanics: new FormControl(false, { nonNullable: true }),
        arcades: new FormControl(false, { nonNullable: true }),
        fighters: new FormControl(false, { nonNullable: true }),
        puzzles: new FormControl(false, { nonNullable: true }),
        applications: new FormControl(false, { nonNullable: true })
    });

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this.filterForm.valueChanges
            .pipe(
                tap((values: Partial<FilterFormValues>) => {
                    this._filterService.changeCategories(values);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
