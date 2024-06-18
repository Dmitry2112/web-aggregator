import { ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { GameModel } from '../../data/models/game.model';
import { CategoryDataService } from '../../data/services/category-data.service';
import { map } from 'rxjs';
import { CategoryModel } from '../../data/models/category.model';
import { ThemeDataService } from '../../data/services/theme-data.service';
import { ThemeModel } from '../../data/models/theme.model';
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'game-card-admin',
    templateUrl: './game-card-admin.component.html',
    styleUrls: ['./styles/game-card-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, TuiButtonModule, RouterLink]
})
export class GameCardAdminComponent implements OnInit {
    @Input({ required: true })
    public game!: GameModel;

    public category: WritableSignal<string> = signal('');
    public theme: WritableSignal<string> = signal('');

    constructor(
        private _categoryDataService: CategoryDataService,
        private _themeDataService: ThemeDataService
    ) { }

    public ngOnInit(): void {
        this._categoryDataService.getAllCategories()
            .pipe(
                map((categories: CategoryModel[]) => {
                    const filteredCategories: CategoryModel[] = categories.filter((category: CategoryModel) => category.id === this.game.categoryId);

                    return filteredCategories[0];
                })
            )
            .subscribe((category: CategoryModel) => this.category.set(category.name));

        this._themeDataService.getAllThemes()
            .pipe(
                map((themes: ThemeModel[]) => {
                    const filteredThemes: ThemeModel[] = themes.filter((theme: ThemeModel) => theme.id === this.game.theme);

                    return filteredThemes[0];
                })
            )
            .subscribe((theme: ThemeModel) => this.theme.set(theme.name));
    }
}
