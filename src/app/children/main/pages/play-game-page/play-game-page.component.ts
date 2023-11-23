import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Inject,
    OnInit,
    Signal,
    signal
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameDataService } from '../../data/services/game-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BACKEND_URL_TOKEN } from '../../../../data/tokens/backend-url.token';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'play-game-page',
    templateUrl: './play-game-page.component.html',
    styleUrls: ['./styles/play-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayGamePageComponent implements OnInit {
    public games$: Observable<any> = new Observable<any>();
    public gameUrl: Signal<SafeResourceUrl> = signal('');
    constructor(
        private _gameDataService: GameDataService,
        private _route: ActivatedRoute,
        @Inject(BACKEND_URL_TOKEN) public readonly backendUrl: string,
        private _sanitizer: DomSanitizer
    ) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this.games$ = this._gameDataService.games$.asObservable();
        this._gameDataService.getAllGames().subscribe();
        this._route.params
            .subscribe((params: Params) => {
                this.gameUrl = computed(() =>
                    this._sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:5000/games/${params['gameId']}/index.html`)
                );
            });
    }
}
