import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./styles/projects-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent { }
