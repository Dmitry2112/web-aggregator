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

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StudentModule,
        AuthModule,
    ],
    providers: [
        {
            provide: BACKEND_URL_TOKEN,
            useValue: environment.apiUrl
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendUrlInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
