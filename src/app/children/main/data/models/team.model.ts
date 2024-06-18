import { ITeamResponseModel } from '../response-models/team.response-model.interface';

export class TeamModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: ITeamResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
