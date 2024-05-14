import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';
import { ProjectStatusDataService } from '../../../../data/services/project-status-data.service';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { ProjectStatusModel } from '../../../../data/models/project-status.model';
import { AsyncPipe } from '@angular/common';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
    selector: 'projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./styles/projects-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent, TuiButtonModule, AsyncPipe],
    providers: [TuiDestroyService]
})
export class ProjectsPageComponent implements OnInit {
    public projectStatus$: BehaviorSubject<ProjectStatusModel> = new BehaviorSubject<ProjectStatusModel>({} as ProjectStatusModel);

    constructor(
        private _projectStatusDataService: ProjectStatusDataService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this._projectStatusDataService.getAllStatuses()
            .pipe(
                tap((statuses: ProjectStatusModel[]) => {
                    statuses.forEach((status: ProjectStatusModel) => {
                        if (status.id === '1') {
                            this.projectStatus$.next(status);
                        }
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
