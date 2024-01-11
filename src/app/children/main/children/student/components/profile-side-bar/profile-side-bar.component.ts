import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileNavComponent } from '../profile-nav/profile-nav.component';

@Component({
    selector: 'profile-side-bar',
    standalone: true,
    imports: [CommonModule, ProfileNavComponent],
    templateUrl: './profile-side-bar.component.html',
    styleUrls: ['./styles/profile-side-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSideBarComponent { }
