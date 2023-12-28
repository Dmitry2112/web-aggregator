import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data/services/auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.isAuthenticated()) {
        router.navigate([`cabinet`]);
    }

    return !authService.isAuthenticated();
};

