import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILoginForm } from '../../data/interfaces/login-form.interface';
import { AuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { IAuthUserResponseModel } from '../../data/response-models/auth-user.response-model.interface';
import { UserLoginViewModel } from '../../view-models/user-login.view-model';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./styles/login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    public userLoginViewModel: UserLoginViewModel = new UserLoginViewModel();
    public loginForm: FormGroup<ILoginForm> = this.userLoginViewModel.loginForm;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    public onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();

            return;
        }
        this.loginForm.disable();
        //TODO: реализовать отписку
        this._authService
            .login(this.userLoginViewModel.toModel())
            .subscribe(
                (data: IAuthUserResponseModel) => {
                    this._router.navigate(['cabinet']);
                }
            );
    }
}
