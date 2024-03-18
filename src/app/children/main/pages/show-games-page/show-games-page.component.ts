import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesComponent } from '../../components/games/games.component';
import { TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiDataListWrapperModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';

@Component({
    selector: 'show-games-page',
    templateUrl: './show-games-page.component.html',
    styleUrls: ['./styles/show-projects-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        TuiSelectModule,
        TuiCheckboxLabeledModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        GamesComponent,
        FilterFormComponent
    ]
})
export class ShowGamesPageComponent {
    public events: string[] = [
        'Осень 2023',
    ];

    public chooseEvent: FormControl<string> = new FormControl();
}
