import { Routes } from '@angular/router';
import { isLoggedInGuard } from './guards/isLoggedIn.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        canActivate: [isLoggedInGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent }
        ]
    }
];
