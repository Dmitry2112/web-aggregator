import { ChangeDetectionStrategy, Component, computed, OnInit, signal, Signal } from '@angular/core';
import { AuthService } from '../../children/auth/data/services/auth.service';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./styles/main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, NgIf, NgClass]
})
export class MainHeaderComponent implements OnInit {
    public showMenu: boolean = false;
    public isLogin: Signal<boolean> = computed(() => this._authService.isAuthenticated());
    public defaultAvatarUrl: Signal<SafeResourceUrl> = signal('');

    constructor(
        private _authService: AuthService,
        private _sanitizer: DomSanitizer
    ) {}

    public ngOnInit(): void {
        this.defaultAvatarUrl = computed(() =>
            this._sanitizer.bypassSecurityTrustResourceUrl('https://storage.yandexcloud.net/web-aggregator-bucket/avatar-guest-img.svg')
        );
    }

    public show(): void {
        this.showMenu = !this.showMenu;
    }

    public logout(): void {
        this._authService.logout();
    }
}
