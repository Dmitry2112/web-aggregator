import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiCheckboxLabeledModule } from '@taiga-ui/kit';

@Component({
    selector: 'filter-form',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TuiCheckboxLabeledModule
    ],
    templateUrl: './filter-form.component.html',
    styleUrl: './styles/filter-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterFormComponent {
    public filterForm: FormGroup = new FormGroup({
        all: new FormControl(false),
        math: new FormControl(false),
        medicine: new FormControl(false),
        physics: new FormControl(false),
        biomechanics: new FormControl(false),
        arcades: new FormControl(false),
        fighters: new FormControl(false),
        puzzles: new FormControl(false),
        applications: new FormControl(false)
    });
}
