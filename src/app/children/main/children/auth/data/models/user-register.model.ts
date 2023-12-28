import { IUserRegisterRequestModel } from '../request-models/user-register.request-model.interface';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';

export class UserRegisterModel {
    public lastName: string = '';
    public firstName: string = '';
    public email: string = '';
    public password: string = '';
    public academicGroup: string = '';

    public toDto(): IUserRegisterRequestModel {
        return {
            surname: this.lastName,
            name: this.firstName,
            email: this.email,
            password: this.password,
            academicGroup: this.academicGroup
        };
    }

    public fromDto(dto: IAuthUserResponseModel): void {
        //TODO: получить данные из dto в поля модели
    }
}
