import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { BACKEND_URL_TOKEN } from './data/tokens/backend-url.token';
import { StudentModule } from './children/main/children/student/student.module';
import { AuthModule } from './children/main/children/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './data/interceptors/auth.interceptor';
import { environment } from '../environments/environment';
import { BackendUrlInterceptor } from './data/interceptors/backendUrl.interceptor';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StudentModule,
        AuthModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiAlertModule
    ],
    providers: [
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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
