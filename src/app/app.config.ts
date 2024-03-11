import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TUI_SANITIZER, TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './data/interceptors/auth.interceptor';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { backendUrlInterceptor } from './data/interceptors/backendUrl.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, TuiRootModule, TuiAlertModule),
        provideHttpClient(
            withInterceptors([
                backendUrlInterceptor,
                authInterceptor
            ])
        ),
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        provideAnimations(),
        provideRouter(APP_ROUTES)
    ]
};
