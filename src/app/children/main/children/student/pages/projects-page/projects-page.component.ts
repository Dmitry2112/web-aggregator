import { ChangeDetectionStrategy, Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';
import { ProjectStatusDataService } from '../../../../data/services/project-status-data.service';
import { BehaviorSubject, debounceTime, takeUntil, tap } from 'rxjs';
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
import { SemesterDataService } from '../../../../data/services/semester-data.service';
import { SemesterModel } from '../../../../data/models/semester.model';
import { RoleDataService } from '../../../../data/services/role-data.service';
import { RoleModel } from '../../../../data/models/role.model';
import { AuthService } from '../../../auth/data/services/auth.service';
import { TeamDataService } from '../../../../data/services/team-data.service';
import { UserDataService } from '../../data/services/user-data.service';
import { UserModel } from '../../data/models/user.model';
import { TeamModel } from '../../../../data/models/team.model';

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
    public selectedSemester: WritableSignal<string> = signal('');
    public userId: Signal<string> = computed(() => this._authService.getUserId());
    public teamId: WritableSignal<string> = signal('');
    public teamName: WritableSignal<string> = signal('');
    public users: UserModel[] = [];
    public viewUsers: Signal<string[]> = computed(() => {
        return this.users
            .map((user: UserModel) => {
                return `${user.surname} ${user.name}, ${user.academicGroup}, ${user.id}`;
            });
    });
    public studentIds: Set<string> = new Set<string>();

    public semesterNameToSemesterId: Record<string, string> = {
        'Осень 2023': '',
        'Весна 2024': '',
        'Осень 2024': '',
        'Весна 2025': ''
    };

    public roleNameToRoleId: Record<string, string> = {};

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
        private _semesterDataService: SemesterDataService,
        private _roleDataService: RoleDataService,
        private _authService: AuthService,
        private _teamDataService: TeamDataService,
        private _userDataService: UserDataService,
        private _destroy$: TuiDestroyService
    ) {}

    public ngOnInit(): void {
        this._semesterDataService.getAllSemesters()
            .pipe(
                tap((semesters: SemesterModel[]) => {
                    semesters.forEach((semester: SemesterModel) => {
                        switch (semester.name) {
                            case 'Осень 2023':
                                this.semesterNameToSemesterId['Осень 2023'] = semester.id;
                                break;
                            case 'Весна 2024':
                                this.semesterNameToSemesterId['Весна 2024'] = semester.id;
                                break;
                            case 'Осень 2024':
                                this.semesterNameToSemesterId['Осень 2024'] = semester.id;
                                break;
                            case 'Весна 2025':
                                this.semesterNameToSemesterId['Весна 2025'] = semester.id;
                                break;
                        }
                    });
                }),
                tap(() => {
                    this.selectedSemester.set(this.semesterNameToSemesterId['Осень 2023']);
                }),
                takeUntil(this._destroy$)
            ).subscribe();

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

        this._roleDataService.getAllRoles()
            .pipe(
                tap((roles: RoleModel[]) => {
                    roles.forEach((role: RoleModel) => {
                        this.roleNameToRoleId[role.name] = role.id;
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();

        this._userDataService.getAllUsers()
            .pipe(
                tap((users: UserModel[]) => {
                    this.users = users;
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

        this.teamNameForm.valueChanges
            .pipe(
                debounceTime(300),
                tap((v: {name: string}) => {
                    this.teamName.set(v.name);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public selectSemester(semesterName: string): void {
        this.selectedSemester.set(this.semesterNameToSemesterId[semesterName]);
    }

    public createNewTeam(): void {
        this.createTeam.set(true);
    }

    public viewProject(): void {
        this.createTeam.set(false);
    }

    public addTeamMember(): void {
        const value: string = this.teamMemberInfoForm.controls['info'].value;

        const [surnameAndName, academicGroup, id]: string[] = value.split(',');
        const [surname, name]: string[] = surnameAndName.split(' ');

        const newMember: TeamMember = {
            name,
            surname,
            academicGroup
        };

        this.team.push(newMember);
        this.studentIds.add(id.trim());

        this.teamMemberInfoForm.reset('');
    }

    public submitForms(): void {
        this._roleDataService.postTeamDist({
            userId: this.userId(),
            roleId: this.roleNameToRoleId[this.role()],
            semesterId: this.selectedSemester()
        })
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe();

        this._teamDataService.createTeam(this.teamName())
            .pipe(
                tap((team: TeamModel) => {
                    this.teamId.set(team.id);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();

        this._teamDataService.addTeamIdForStudents({
            semesterId: this.selectedSemester(),
            teamId: this.teamId(),
            studentsIds: [...this.studentIds]
        })
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
