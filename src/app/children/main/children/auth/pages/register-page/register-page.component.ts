import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterForm } from '../../data/interfaces/register-form.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { IUserRegisterRequestModel } from '../../data/request-models/user-register.request-model.interface';
import { passwordValidator } from '../../validators/password.validator';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./styles/register-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnDestroy {
    public registerForm!: FormGroup<IRegisterForm>;

    private _registerSubscription!: Subscription;

    constructor(private _auth: AuthService, private _router: Router) {
        this.registerForm = new FormGroup<IRegisterForm>({
            lastName: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            firstName: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                    passwordValidator
                ]
            }),
            academicGroup: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            })
        });
    }

    public ngOnDestroy(): void {
        if (this._registerSubscription) {
            this._registerSubscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();

            return;
        }
        const user: IUserRegisterRequestModel = {
            lastName: this.registerForm.controls.lastName.value,
            firstName: this.registerForm.controls.firstName.value,
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value,
            academicGroup: this.registerForm.controls.academicGroup.value
        };

        this.registerForm.disable();
        this._registerSubscription = this._auth
            .register(user)
            .subscribe(
                () => {
                    alert('Вы успешно зарегистрированы!');
                    this._router.navigate(['cabinet']);
                }
            );
    }
}
