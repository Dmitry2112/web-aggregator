import { ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { GameModel } from '../../data/models/game.model';
import { CategoryDataService } from '../../data/services/category-data.service';
import { filter, map, Observable, take } from 'rxjs';
import { CategoryModel } from '../../data/models/category.model';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./styles/game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent implements OnInit {
    @Input({ required: true })
    public game!: GameModel;

    public category: WritableSignal<string> = signal('');

    constructor(private _categoryDataService: CategoryDataService) {
    }

    //тема, категория, название, краткое описание, id

    public ngOnInit(): void {
        this._categoryDataService.getAllCategories()
            .pipe(
                map((categories: CategoryModel[]) => {
                    categories.filter((category: CategoryModel) => category.id === this.game.categoryId);

                    return categories[0];
                })
            )
            .subscribe((category: CategoryModel) => this.category.set(category.name));
    }
}
