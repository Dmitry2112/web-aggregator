import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';

@Component({
    selector: 'profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./styles/profile-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent, ProfileFormComponent]
})
export class ProfilePageComponent {}
