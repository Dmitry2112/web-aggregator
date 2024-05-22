import { IProjectStatusResponseModel } from '../response-models/project-status.response-model.interface';

export class ProjectStatusModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: IProjectStatusResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
