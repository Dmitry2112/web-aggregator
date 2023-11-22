import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDataService } from '../../data/services/game-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'about-game-page',
    templateUrl: './about-game-page.component.html',
    styleUrls: ['./styles/about-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutGamePageComponent implements OnInit {
    public games$: Observable<any> = new Observable<any>();
    public gameId: WritableSignal<string> = signal('');
    constructor(
        private _gameDataService: GameDataService,
        private _route: ActivatedRoute
    ) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this.games$ = this._gameDataService.games$.asObservable();
        this._gameDataService.getAllGames().subscribe();
        this._route.params
            .subscribe((params: Params) => {
                this.gameId.set(params['gameId']);
            });
    }
}
