import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'add-project-page',
    templateUrl: './add-project-page.component.html',
    styleUrls: ['./styles/add-project-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProjectPageComponent { }
