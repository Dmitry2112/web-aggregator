import { IGameResponseModel } from '../response-models/game.response-model.interface';
import { IGameRequestModel } from '../request-models/game.request-model.interface';

export class GameModel {
    public id: string = '';
    public teamId: string = '';
    public name: string = '';
    public semesterId: string = '';
    public categoryId: string = '';
    public theme: string = '';
    public rating: string = '';
    public statusId: string = '';
    public shortDescription: string = '';
    public playDescription: string = '';
    public gitHubLink: string = '';
    public gameFile?: File; //TODO: возможно сделать обязательным или undefined

    public toDto(): IGameRequestModel {
        const newGame: IGameRequestModel = new FormData();

        newGame.append('team_id', this.teamId);
        newGame.append('name', this.name);
        newGame.append('semesterId', this.semesterId);
        newGame.append('categoryId', this.categoryId);
        newGame.append('theme', this.theme);
        newGame.append('rating', this.rating);
        newGame.append('statusId', this.statusId);
        newGame.append('shortDescription', this.shortDescription);
        newGame.append('playDescription', this.playDescription);
        newGame.append('gitHubLink', this.gitHubLink);
        newGame.append('file_name', this.gameFile as File);

        return newGame;
    }

    public fromDto(dto: IGameResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
        this.categoryId = dto.categoryId;
        this.theme = dto.theme;
        this.shortDescription = dto.shortDescription;
        this.playDescription = dto.playDescription;
        this.gitHubLink = dto.gitHubLink;
    }
}
