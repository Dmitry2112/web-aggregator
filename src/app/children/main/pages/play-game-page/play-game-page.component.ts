import {
    ChangeDetectionStrategy,
    Component,
    computed, Inject,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BACKEND_URL_TOKEN } from '../../../../data/tokens/backend-url.token';

@Component({
    selector: 'play-game-page',
    templateUrl: './play-game-page.component.html',
    styleUrls: ['./styles/play-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class PlayGamePageComponent implements OnInit {
    public gameUrl: Signal<SafeResourceUrl> = signal('');
    constructor(
        private _route: ActivatedRoute,
        @Inject(BACKEND_URL_TOKEN) private readonly _backendUrl: string,
        private _sanitizer: DomSanitizer
    ) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this._route.params
            .subscribe((params: Params) => {
                this.gameUrl = computed(() =>
                    this._sanitizer.bypassSecurityTrustResourceUrl(`${this._backendUrl}/games/${params['gameId']}/index.html`)
                );
            });
    }
}
