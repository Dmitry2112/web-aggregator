import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameDataService } from '../../services/game-data.service';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html'
})
export class LoadGameComponent {
    public gameId: string = '1';

    public loadGameForm: FormGroup = new FormGroup({
        file: new FormControl('', [
            Validators.required
        ]),
    });

    private _game!: File;

    constructor(private _gameDataService: GameDataService) {
        this._gameDataService.addGame('sdd').subscribe();
    }

    public onFileSelected(event: any): void {
        this._game = event.target.files[0];
    }

    public onSubmit(): void {
        if (this.loadGameForm.invalid) {
            this.loadGameForm.markAllAsTouched();

            return;
        }

        const newGame: FormData = new FormData();
        newGame.append('name', '');
        newGame.append('file', this._game);

        this._gameDataService.addGame(newGame).subscribe();
    }
}
