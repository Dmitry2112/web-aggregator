import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterForm } from '../data/interfaces/register-form.interface';
import { passwordValidator } from '../validators/password.validator';
import { UserRegisterModel } from '../data/models/user-register.model';

export class UserRegisterViewModel {
    public registerForm: FormGroup<IRegisterForm> = new FormGroup<IRegisterForm>({
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

    public toModel(): UserRegisterModel {
        const userRegisterModel: UserRegisterModel = new UserRegisterModel();

        userRegisterModel.lastName = this.registerForm.controls.lastName.value;
        userRegisterModel.firstName = this.registerForm.controls.firstName.value;
        userRegisterModel.email = this.registerForm.controls.email.value;
        userRegisterModel.password = this.registerForm.controls.password.value;
        userRegisterModel.academicGroup = this.registerForm.controls.academicGroup.value;

        return userRegisterModel;
    }

    public fromModel(): void {
        //TODO: Получаем данные из модели
    }
}
