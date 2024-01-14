import { IUserResponseModel } from '../response-models/user.response-model.interface';

export class UserModel {
    public id: string = '';
    public email: string = '';
    public name: string = '';
    public surname: string = '';
    public academicGroup: string = '';

    public fromDto(dto: IUserResponseModel): void {
        this.id = dto.id;
        this.email = dto.email;
        this.name = dto.name;
        this.surname = dto.surname;
        this.academicGroup = dto.academicGroup;
    }
}
