import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StudentModule } from './children/main/children/student/student.module';
import { TUI_SANITIZER, TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './data/interceptors/auth.interceptor';
import { BackendUrlInterceptor } from './data/interceptors/backendUrl.interceptor';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, StudentModule, TuiRootModule, TuiAlertModule),
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
        provideRouter(routes)
    ]
};
