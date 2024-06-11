import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'project-info',
    standalone: true,
    imports: [],
    templateUrl: './project-info.component.html',
    styleUrl: './styles/project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent {

}
