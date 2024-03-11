import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { IUserResponseModel } from '../response-models/user.response-model.interface';

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
}
