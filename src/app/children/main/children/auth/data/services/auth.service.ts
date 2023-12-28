import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';
import { Router } from '@angular/router';
import { IUserRegisterRequestModel } from '../request-models/user-register.request-model.interface';
import { BACKEND_URL_TOKEN } from '../../../../../../data/tokens/backend-url.token';
import { IUserLoginRequestModel } from '../request-models/user-login.request-model.interface';
import { UserRegisterModel } from '../models/user-register.model';
import { UserLoginModel } from '../models/user-login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: WritableSignal<string> = signal('');

    constructor(
        private _http: HttpClient,
        private _router: Router,
        @Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string,
    ) {
    }

    public register(newUser: UserRegisterModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>(`${this._backendUrl}/auth/register`, newUser.toDto())
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.token);
                })
            );
    }

    public login(user: UserLoginModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>(`${this._backendUrl}/auth/login`, user.toDto())
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.token);
                })
            );
    }

    public logout(): void {
        this.removeToken();
        localStorage.clear();
        this._router.navigate(['cabinet']);
    }

    public isAuthenticated(): boolean {
        return !!this._token() || !!localStorage.getItem('token');
    }

    //TODO: использовать, чтобы передавать токен в запросах
    public getToken(): string | undefined {
        return this._token();
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
        this._token.set(token);
    }

    private removeToken(): void {
        localStorage.removeItem('token');
        this._token.set('');
    }
}
