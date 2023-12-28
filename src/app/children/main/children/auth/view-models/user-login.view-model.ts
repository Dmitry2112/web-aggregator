import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginForm } from '../data/interfaces/login-form.interface';
import { passwordValidator } from '../validators/password.validator';
import { UserLoginModel } from '../data/models/user-login.model';

export class UserLoginViewModel {
    public loginForm: FormGroup<ILoginForm> = new FormGroup<ILoginForm>({
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
        })
    });

    public toModel(): UserLoginModel {
        const userLoginModel: UserLoginModel = new UserLoginModel();

        userLoginModel.email = this.loginForm.controls.email.value;
        userLoginModel.password = this.loginForm.controls.password.value;

        return userLoginModel;
    }

    public fromModel(): void {
        //TODO: Получаем данные из модели
    }
}
