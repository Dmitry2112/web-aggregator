import { IUserResponseModel } from '../../children/student/data/response-models/user.response-model.interface';

export interface ITeammateResponseModel {
    teamRole: string;
    user: IUserResponseModel
}
