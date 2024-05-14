import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';

@Component({
    selector: 'security-page',
    templateUrl: './security-page.component.html',
    styleUrls: ['./styles/security-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent, TuiButtonModule]
})
export class SecurityPageComponent { }
