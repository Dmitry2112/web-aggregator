import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { AuthService } from '../../children/auth/data/services/auth.service';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./styles/main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
    public showMenu: boolean = false;
    public isLogin: Signal<boolean> = computed(() => this._authService.isAuthenticated());

    constructor(private _authService: AuthService) {
    }

    public show(): void {
        this.showMenu = !this.showMenu;
    }

    public logout(): void {
        this._authService.logout();
    }
}
