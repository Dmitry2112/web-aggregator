import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL_TOKEN } from '../tokens/backend-url.token';
import { Observable } from 'rxjs';

@Injectable()
export class BackendUrlInterceptor implements HttpInterceptor {
    constructor(@Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq: HttpRequest<any> = request.clone({ url: `${this._backendUrl}/${request.url}` });

        return next.handle(apiReq);
    }
}
