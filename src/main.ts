import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/component/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StudentModule } from './app/children/main/children/student/student.module';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule, TuiAlertModule } from '@taiga-ui/core';
import { BackendUrlInterceptor } from './app/data/interceptors/backendUrl.interceptor';
import { AuthInterceptor } from './app/data/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, StudentModule, TuiRootModule, TuiAlertModule),
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
        provideAnimations()
    ]
})
    .catch((err: Error) => console.error(err));
