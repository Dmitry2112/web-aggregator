import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegisterForm } from '../../data/interfaces/register-form.interface';
import { AuthService } from '../../data/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterViewModel } from '../../view-models/user-register.view-model';
import { TuiAlertService, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { TuiHintModule } from '@taiga-ui/core/directives/hint';
import { TuiInputModule, TuiInputPasswordModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./styles/register-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiErrorModule,
        TuiHintModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        TuiLinkModule,
        RouterLink,
        AsyncPipe,
        TuiFieldErrorPipeModule
    ]
})
export class RegisterPageComponent {
    public userRegisterViewModel: UserRegisterViewModel = new UserRegisterViewModel();
    public registerForm: FormGroup<IRegisterForm> = this.userRegisterViewModel.registerForm;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        @Inject(TuiAlertService) private readonly _alerts: TuiAlertService
    ) { }

    public showRegisterSuccess(): void {
        this._alerts
            .open('', { label: 'Вы успешно зарегистрированы!', status: 'success' })
            .subscribe();
    }

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
                    this.showRegisterSuccess();
                    this._router.navigate(['cabinet']);
                }
            );
    }
}
