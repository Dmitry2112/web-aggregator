import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { GameDataService } from '../../data/services/game-data.service';
import { map, tap } from 'rxjs';
import { GameModel } from '../../data/models/game.model';
import { TuiButtonModule } from '@taiga-ui/core';
import { HistoryService } from '../../services/history.service';

@Component({
    selector: 'about-game-page',
    templateUrl: './about-game-page.component.html',
    styleUrls: ['./styles/about-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, TuiButtonModule]
})
export class AboutGamePageComponent implements OnInit {
    public gameId: WritableSignal<string> = signal('');

    public name: WritableSignal<string> = signal('');
    public shortDescription: WritableSignal<string> = signal('');
    public playDescription: WritableSignal<string> = signal('');
    public gitHubLink: WritableSignal<string> = signal('');

    constructor(
        private _route: ActivatedRoute,
        private _gameDataService: GameDataService,
        private _historyService: HistoryService,
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

        this._historyService.addGameInHistory(this.gameId());
    }
}
