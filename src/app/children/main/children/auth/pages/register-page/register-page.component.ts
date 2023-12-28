import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRegisterForm } from '../../data/interfaces/register-form.interface';
import { AuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { UserRegisterViewModel } from '../../view-models/user-register.view-model';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./styles/register-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
    public userRegisterViewModel: UserRegisterViewModel = new UserRegisterViewModel();
    public registerForm: FormGroup<IRegisterForm> = this.userRegisterViewModel.registerForm;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    public onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();

            return;
        }

        this.registerForm.disable();
        //TODO: реализовать отписку
        this._authService
            .register(this.userRegisterViewModel.toModel())
            .subscribe(
                () => {
                    alert('Вы успешно зарегистрированы!');
                    this._router.navigate(['cabinet']);
                }
            );
    }
}
