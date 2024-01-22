import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const BACKEND_URL_TOKEN: InjectionToken<string> = new InjectionToken<string>(
    'url for making api requests',
    {
        factory: () => environment.apiUrl
    }
);
