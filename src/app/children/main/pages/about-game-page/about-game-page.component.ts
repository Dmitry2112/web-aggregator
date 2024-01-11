import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameDataService } from '../../data/services/game-data.service';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ThemeModel } from '../../data/models/theme.model';
import { GameModel } from '../../data/models/game.model';

@Component({
    selector: 'about-game-page',
    templateUrl: './about-game-page.component.html',
    styleUrls: ['./styles/about-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutGamePageComponent implements OnInit {
    public gameId: WritableSignal<string> = signal('');

    public name: WritableSignal<string> = signal('');
    public shortDescription: WritableSignal<string> = signal('');
    public playDescription: WritableSignal<string> = signal('');
    public gitHubLink: WritableSignal<string> = signal('');

    constructor(
        private _route: ActivatedRoute,
        private _gameDataService: GameDataService
    ) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this._route.params
            .pipe(
                tap((params: Params) =>
                    this.gameId.set(params['gameId'])
                )
            )
            .subscribe();

        this._gameDataService.getAllGames()
            .pipe(
                map((games: GameModel[]) => {
                    const filteredGames: GameModel[] = games.filter((game: GameModel) => game.id === this.gameId());

                    return filteredGames[0];
                })
            )
            .subscribe((game: GameModel) => {
                this.name.set(game.name);
                this.shortDescription.set(game.shortDescription);
                this.playDescription.set(game.playDescription);
                this.gitHubLink.set(game.gitHubLink);
            });
    }
}
