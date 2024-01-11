import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/data/services/auth.service';

@Component({
    selector: 'profile-nav',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile-nav.component.html',
    styleUrls: ['./styles/profile-nav.component.scss']
})
export class ProfileNavComponent {
    constructor(private _authService: AuthService) { }

    public logout(): void {
        this._authService.logout();
    }
}
