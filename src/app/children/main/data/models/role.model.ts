import { IRoleResponseModel } from '../response-models/role.response-model.interface';

export class RoleModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: IRoleResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
