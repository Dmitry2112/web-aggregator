import { FormControl } from '@angular/forms';

export interface IFilterForm {
    all: FormControl<boolean>;
    math: FormControl<boolean>;
    medicine: FormControl<boolean>;
    physics: FormControl<boolean>;
    biomechanics: FormControl<boolean>;
    arcades: FormControl<boolean>;
    fighters: FormControl<boolean>;
    puzzles: FormControl<boolean>;
    applications: FormControl<boolean>;
}
