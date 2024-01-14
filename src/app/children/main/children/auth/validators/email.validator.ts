import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (!value) {
        return null;
    }

    const emailIsUrFU: boolean = /@urfu.me/.test(value);

    return !emailIsUrFU ? { emailIsUrFU: true } : null;
}
