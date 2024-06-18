import { UserModel } from '../../children/student/data/models/user.model';
import { ITeammateResponseModel } from '../response-models/teammate.response-model.interface';

export class TeammateModel {
    public teamRole: string = '';
    public user: UserModel = {} as UserModel;

    public fromDto(dto: ITeammateResponseModel): void {
        this.teamRole = dto.teamRole;

        const userModel: UserModel = new UserModel();
        userModel.fromDto(dto.user);
        this.user = userModel;
    }
}
