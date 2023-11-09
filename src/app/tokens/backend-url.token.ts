import { InjectionToken } from '@angular/core';

export const BACKEND_URL_TOKEN: InjectionToken<string> = new InjectionToken<string>('url for making api requests');
