import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameModel } from '../../../data/models/game.model';

export class LoadGameViewModel {
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
        categoryId: new FormControl('182a911a-51a4-4cfd-bb09-21ce69235435', [
            Validators.required
        ]),
        theme: new FormControl('80251835-18e4-4d7e-8af4-dd20d558f7e8', [
            Validators.required
        ]),
        gitHubLink: new FormControl('', [
            Validators.required
        ]),
        file: new FormControl('', [
            Validators.required
        ]),
    });
    public gameFile?: File;

    public toModel(): GameModel {
        const game: GameModel = new GameModel();

        game.teamId = '123';
        game.name = this.loadGameForm.controls['name'].value;
        game.semesterId = 'a785e7f4-c551-489f-945b-d4b15c98cc2b';
        game.categoryId = this.loadGameForm.controls['categoryId'].value;
        game.theme = this.loadGameForm.controls['theme'].value;
        game.rating = '0';
        game.statusId = '93741186-1255-49d4-b33b-d63c3a708d17';
        game.shortDescription = this.loadGameForm.controls['shortDescription'].value;
        game.playDescription = this.loadGameForm.controls['playDescription'].value;
        game.gitHubLink = this.loadGameForm.controls['gitHubLink'].value;
        game.gameFile = this.gameFile;

        return game;
    }

    public fromModel(): void {
        //TODO: Получаем данные из модели
    }
}
