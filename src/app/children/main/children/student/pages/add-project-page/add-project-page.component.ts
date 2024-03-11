import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadGameComponent } from '../../components/load-game/load-game.component';

@Component({
    selector: 'add-project-page',
    templateUrl: './add-project-page.component.html',
    styleUrls: ['./styles/add-project-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LoadGameComponent]
})
export class AddProjectPageComponent { }
