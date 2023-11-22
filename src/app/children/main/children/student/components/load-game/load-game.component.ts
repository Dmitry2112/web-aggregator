import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameDataService } from '../../../../data/services/game-data.service';
import { BACKEND_URL_TOKEN } from '../../../../../../data/tokens/backend-url.token';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadGameComponent implements OnInit {
    public gameId: string = '';
    //public games$: Observable<any> = new Observable<any>();

    public loadGameForm: FormGroup = new FormGroup({
        file: new FormControl('', [
            Validators.required
        ]),
    });

    private _game!: File;

    constructor(
        private _gameDataService: GameDataService,
        @Inject(BACKEND_URL_TOKEN) public readonly backendUrl: string
    ) { }

    public ngOnInit(): void {
        // this.games$ = this._gameDataService.games$;
        // this._gameDataService.getAllGames().subscribe();
    }

    public play(id: string): void {
        this.gameId = id;
    }

    public onFileSelected(event: any): void {
        this._game = event.target.files[0];
    }
    //
    public onSubmit(): void {
        if (this.loadGameForm.invalid) {
            this.loadGameForm.markAllAsTouched();

            return;
        }

        const newGame: FormData = new FormData();
        newGame.append('name', '');
        newGame.append('file', this._game);

        this._gameDataService.addGame(newGame).subscribe((game: any) => {
            this.gameId = game.id;
        });
    }
}
