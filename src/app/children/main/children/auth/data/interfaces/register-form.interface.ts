import { FormControl } from '@angular/forms';

export interface IRegisterForm {
    lastName: FormControl<string>;
    firstName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    academicGroup: FormControl<string>;
}
