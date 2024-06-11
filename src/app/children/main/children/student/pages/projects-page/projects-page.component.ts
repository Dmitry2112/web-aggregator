import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';
import { ProjectStatusDataService } from '../../../../data/services/project-status-data.service';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { ProjectStatusModel } from '../../../../data/models/project-status.model';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiFilesModule, TuiInputFilesModule, TuiInputModule,
    TuiInputMonthModule,
    TuiSelectModule, TuiTextareaModule
} from '@taiga-ui/kit';
import { TeamMember } from '../../types/team-member.type';
import { ProjectInfoComponent } from '../../components/project-info/project-info.component';

@Component({
    selector: 'projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./styles/projects-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent, TuiButtonModule, AsyncPipe, FormsModule, ReactiveFormsModule, TuiDataListWrapperModule, TuiInputMonthModule, TuiSelectModule, TuiTextfieldControllerModule, NgIf, TuiErrorModule, TuiFieldErrorPipeModule, TuiFilesModule, TuiInputFilesModule, TuiInputModule, TuiTextareaModule, NgClass, ProjectInfoComponent],
    providers: [TuiDestroyService]
})
export class ProjectsPageComponent implements OnInit {
    public projectStatus$: BehaviorSubject<ProjectStatusModel> = new BehaviorSubject<ProjectStatusModel>({} as ProjectStatusModel);
    public createTeam: WritableSignal<boolean> = signal(false);
    public role: WritableSignal<string> = signal('');

    public team: TeamMember[] = [];

    public rolesNames: string[] = [
        'Team Lead',
        'UX/UI-дизайнер'
    ];

    public choseRoleForm: FormGroup = new FormGroup({
        role: new FormControl()
    });

    public teamNameForm: FormGroup = new FormGroup({
        name: new FormControl()
    });

    public teamMemberInfoForm: FormGroup = new FormGroup({
        info: new FormControl()
    });

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

        this.choseRoleForm.valueChanges
            .pipe(
                tap((v: {role: string}) => {
                    this.role.set(v.role);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public createNewTeam(): void {
        this.createTeam.set(true);
    }

    public viewProject(): void {
        this.createTeam.set(false);
    }

    public addTeamMember(): void {
        const value: string = this.teamMemberInfoForm.controls['info'].value;

        const [surname, name]: string[] = value.split(',')[0].split(' ');

        const newMember: TeamMember = {
            name,
            surname,
            academicGroup: 'РИ-111111'
        };

        this.team.push(newMember);

        this.teamMemberInfoForm.reset('');
    }
}
