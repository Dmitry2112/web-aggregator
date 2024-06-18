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

        game.teamId = 'b8c921c4-751c-4264-af3a-27d1e903a03d';
        game.name = this.loadGameForm.controls['name'].value;
        game.semesterId = '08a675d0-7931-4a6e-8fc7-d1ffc3d30798';
        game.categoryId = 'dfc43d9f-0e6f-470f-836e-6bf4ff33067b';
        game.theme = 'b8c921c4-751c-4264-af3a-27d1e903a03d';
        game.rating = '0';
        game.statusId = '3e1342cf-792d-41ce-99d8-437b216b4a1e';
        game.shortDescription = this.loadGameForm.controls['shortDescription'].value;
        game.playDescription = this.loadGameForm.controls['playDescription'].value;
        game.gitHubLink = this.loadGameForm.controls['gitHubLink'].value;
        game.gameFile = this.gameFile;

        return game;
    }
}
