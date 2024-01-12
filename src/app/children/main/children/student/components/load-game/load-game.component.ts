import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GameDataService } from '../../../../data/services/game-data.service';
import { LoadGameViewModel } from '../../view-models/load-game.view-model';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html',
    styleUrls: ['./styles/load-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadGameComponent {
    public loadGameViewModel: LoadGameViewModel = new LoadGameViewModel();
    public loadGameForm: FormGroup = this.loadGameViewModel.loadGameForm;

    constructor(private _gameDataService: GameDataService) { }

    public onFileSelected(event: any): void {
        this.loadGameViewModel.gameFile = event.target.files[0];
    }

    public onSubmit(): void {
        if (this.loadGameForm.invalid) {
            this.loadGameForm.markAllAsTouched();

            return;
        }
        alert('Игра отправлена');
        this._gameDataService.addGame(this.loadGameViewModel.toModel()).subscribe(() => alert('Игра загружена'));
    }
}
