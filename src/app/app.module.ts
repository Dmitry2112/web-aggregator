import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { BACKEND_URL_TOKEN } from './data/tokens/backend-url.token';
import { StudentModule } from './children/main/children/student/student.module';
import { AuthModule } from './children/main/children/auth/auth.module';

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
            useValue: 'http://localhost:5000' //TODO: на норм бэке 5000 порт
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
