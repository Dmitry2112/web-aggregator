export interface IAuthUserResponseModel {
    token: string;
    user: {
        email: string;
        id: number;
    };
}
