import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';
import { LoadGameComponent } from '../../components/load-game/load-game.component';

@Component({
    selector: 'add-project-page',
    templateUrl: './add-project-page.component.html',
    styleUrls: ['./styles/add-project-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent, LoadGameComponent]
})
export class AddProjectPageComponent { }
