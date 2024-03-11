import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TUI_SANITIZER, TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './data/interceptors/auth.interceptor';
import { BackendUrlInterceptor } from './data/interceptors/backendUrl.interceptor';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, TuiRootModule, TuiAlertModule),
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendUrlInterceptor,
            multi: true
        },
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        provideAnimations(),
        provideRouter(APP_ROUTES)
    ]
};
