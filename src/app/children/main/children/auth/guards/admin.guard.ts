import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
} from '@angular/router';
import { AuthService } from '../data/services/auth.service';

export const adminGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.isAdmin()) {
        router.navigate(['cabinet/auth/login']);
    }

    return authService.isAdmin();
};
