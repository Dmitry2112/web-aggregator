import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'play-game-page',
    templateUrl: './play-game-page.component.html',
    styleUrls: ['./styles/play-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayGamePageComponent implements OnInit {
    public gameUrl: Signal<SafeResourceUrl> = signal('');
    constructor(
        private _route: ActivatedRoute,
        private _sanitizer: DomSanitizer
    ) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this._route.params
            .subscribe((params: Params) => {
                this.gameUrl = computed(() =>
                    this._sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:5000/games/${params['gameId']}/index.html`)
                );
            });
    }
}
