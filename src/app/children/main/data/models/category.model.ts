import { ICategoryResponseModel } from '../response-models/category.response-model.interface';

export class CategoryModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: ICategoryResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
