import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./styles/profile-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent { }
