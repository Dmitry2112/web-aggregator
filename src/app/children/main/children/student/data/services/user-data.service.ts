import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { IUserResponseModel } from '../response-models/user.response-model.interface';
import { IUserUpdateRequestModel } from '../request-models/user-update.request-model.interface';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    public users$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);

    constructor(private _http: HttpClient) {}

    public getAllUsers(): Observable<UserModel[]> {
        return this._http.get<IUserResponseModel[]>('users')
            .pipe(
                map((users: IUserResponseModel[]) => {
                    return users.map((user: IUserResponseModel) => {
                        const userModel: UserModel = new UserModel();
                        userModel.fromDto(user);

                        return userModel;
                    });
                }),
                tap((users: UserModel[]) => {
                    this.users$.next(users);
                })
            );
    }

    public updateUser(id: string, newUser: IUserUpdateRequestModel): Observable<UserModel> {
        return this._http.put<IUserResponseModel>(`users/${id}`, newUser)
            .pipe(
                map((user: IUserResponseModel) => {
                    const userModel: UserModel = new UserModel();
                    userModel.fromDto(user);

                    return userModel;
                })
            );
    }
}
