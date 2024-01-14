import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiHintModule, TuiLinkModule } from '@taiga-ui/core';


@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        ValidationMessageComponent,
        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiHintModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        TuiLinkModule
    ],
    providers: [],
})
export class AuthModule { }
