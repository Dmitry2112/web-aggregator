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
        categoryId: new FormControl('Развлекательные',[
            Validators.required
        ]),
        theme: new FormControl('Аркады', [
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
        game.semesterId = 'a08544b6-5af3-45ba-85cb-85c3d93d2b6b';
        // game.categoryId = this.loadGameForm.controls['categoryId'].value;
        game.categoryId = '89b1cedd-4ad7-4b1f-94ba-51b8d3d06c2a';
        // game.theme = this.loadGameForm.controls['theme'].value;
        game.theme = '562e6375-5a27-46ae-bc64-19f4ebe86356';
        game.rating = '0';
        game.statusId = 'a0f0260a-3278-4464-8f10-0da38eddbc65';
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
