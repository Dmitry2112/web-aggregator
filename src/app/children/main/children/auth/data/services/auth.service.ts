import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';
import { Router } from '@angular/router';
import { UserRegisterModel } from '../models/user-register.model';
import { UserLoginModel } from '../models/user-login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: WritableSignal<string> = signal('');
    private _userId: WritableSignal<string> = signal('');

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
    }

    public register(newUser: UserRegisterModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>('auth/register', newUser.toDto())
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.token);
                    this.setUserId(response.user.id);
                })
            );
    }

    public login(user: UserLoginModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>('auth/login', user.toDto())
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.token);
                    this.setUserId(response.user.id);
                })
            );
    }

    public logout(): void {
        this.removeToken();
        this.removeUserId();
        localStorage.clear();
        this._router.navigate(['cabinet']);
    }

    public isAuthenticated(): boolean {
        return !!this._token() || !!localStorage.getItem('token');
    }

    //TODO: использовать, чтобы передавать токен в запросах
    public getToken(): string {
        return this._token();
    }

    public getUserId(): string {
        return localStorage.getItem('userId') as string;
        // return this._userId();
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
        this._token.set(token);
    }

    private removeToken(): void {
        localStorage.removeItem('token');
        this._token.set('');
    }

    private setUserId(userId: string): void {
        localStorage.setItem('userId', userId);
        this._userId.set(userId);
    }

    private removeUserId(): void {
        localStorage.removeItem('userId');
        this._userId.set('');
    }
}
