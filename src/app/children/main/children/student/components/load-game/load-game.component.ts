import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameDataService } from '../../../../data/services/game-data.service';
import { BACKEND_URL_TOKEN } from '../../../../../../data/tokens/backend-url.token';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html',
    styleUrls: ['./styles/load-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadGameComponent {
    public loadGameForm: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.required
        ]),
        shortDescription: new FormControl('', [
            Validators.required
        ]),
        playDescription: new FormControl('', [
            Validators.required
        ]),
        categoryId: new FormControl('', [
            Validators.required
        ]),
        theme: new FormControl('', [
            Validators.required
        ]),
        gitHubLink: new FormControl('', [
            Validators.required
        ]),
        file: new FormControl('', [
            Validators.required
        ]),
    });

    private _game!: File;

    constructor(
        private _gameDataService: GameDataService,
        @Inject(BACKEND_URL_TOKEN) public readonly backendUrl: string
    ) { }

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

        newGame.append('teamId', '0');
        newGame.append('name', this.loadGameForm.controls['name'].value);
        newGame.append('semesterId', '0');
        newGame.append('categoryId', this.loadGameForm.controls['categoryId'].value);
        newGame.append('theme', this.loadGameForm.controls['theme'].value);
        newGame.append('rating', '0');
        newGame.append('statusId', '0');
        newGame.append('shortDescription', this.loadGameForm.controls['shortDescription'].value);
        newGame.append('playDescription', this.loadGameForm.controls['playDescription'].value);
        newGame.append('gitHubLink', this.loadGameForm.controls['gitHubLink'].value);
        newGame.append('file', this._game);

        this._gameDataService.addGame(newGame).subscribe();
    }
}
