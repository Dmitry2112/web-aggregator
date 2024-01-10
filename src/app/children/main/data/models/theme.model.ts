import { IThemeResponseModel } from '../response-models/theme.response-model.interface';

export class ThemeModel {
    public id: string = '';
    public name: string = '';

    public fromDto(dto: IThemeResponseModel): void {
        this.id = dto.id;
        this.name = dto.name;
    }
}
