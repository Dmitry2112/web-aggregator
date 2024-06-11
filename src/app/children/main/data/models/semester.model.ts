import { ISemesterResponseModel } from '../response-models/semester.response-model.interface';

export class SemesterModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: ISemesterResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
