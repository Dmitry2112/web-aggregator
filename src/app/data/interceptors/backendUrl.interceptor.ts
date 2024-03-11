import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { BACKEND_URL_TOKEN } from '../tokens/backend-url.token';

export function backendUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const backendUrl: string = inject(BACKEND_URL_TOKEN);
    const apiReq: HttpRequest<any> = req.clone({ url: `${backendUrl}/${req.url}` });

    return next(apiReq);
}
