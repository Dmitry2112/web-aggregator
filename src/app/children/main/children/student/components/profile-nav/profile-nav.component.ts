import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/data/services/auth.service';

@Component({
    selector: 'profile-nav',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile-nav.component.html',
    styleUrls: ['./styles/profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {
    public profileActive: WritableSignal<boolean> = signal(false);
    public projectsActive: WritableSignal<boolean> = signal(false);
    public securityActive: WritableSignal<boolean> = signal(false);

    constructor(
        private _authService: AuthService,
        private _route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        if (this._route.snapshot.url[0].path === 'profile') {
            this.profileActive.set(true);
        } else if (this._route.snapshot.url[0].path === 'projects') {
            this.projectsActive.set(true);
        } else {
            this.securityActive.set(true);
        }

        // this._route.snapshot.url[0].path === 'profile' ? this.profileActive.set(true) : this.projectsActive.set(true);
    }

    public logout(): void {
        this._authService.logout();
    }
}
