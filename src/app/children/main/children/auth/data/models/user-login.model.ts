import { IUserLoginRequestModel } from '../request-models/user-login.request-model.interface';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';

export class UserLoginModel {
    public email: string = '';
    public password: string = '';

    public toDto(): IUserLoginRequestModel {
        return {
            email: this.email,
            password: this.password
        };
    }

    public fromDto(dto: IAuthUserResponseModel): void {
        //TODO: получить данные из dto в поля модели
    }
}
