import { ChangeDetectionStrategy, Component, computed, input, InputSignal, OnInit, Signal } from '@angular/core';
import { AuthService } from '../../../auth/data/services/auth.service';
import { GameDataService } from '../../../../data/services/game-data.service';
import { RoleDataService } from '../../../../data/services/role-data.service';
import { TeamDataService } from '../../../../data/services/team-data.service';
import { Observable, tap } from 'rxjs';
import { GameModel } from '../../../../data/models/game.model';
import { RoleModel } from '../../../../data/models/role.model';
import { TeammateModel } from '../../../../data/models/teammate.model';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'project-info',
    standalone: true,
    imports: [
        AsyncPipe
    ],
    templateUrl: './project-info.component.html',
    styleUrl: './styles/project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent implements OnInit {
    public semesterId: InputSignal<string> = input.required<string>();
    public userId: Signal<string> = computed(() => this._authService.getUserId());
    public game$: Observable<GameModel> = new Observable<GameModel>();
    public role$: Observable<RoleModel> = new Observable<RoleModel>();
    public team$: Observable<TeammateModel[]> = new Observable<TeammateModel[]>();

    constructor(
        private _authService: AuthService,
        private _gameDataService: GameDataService,
        private _roleDataService: RoleDataService,
        private _teamDataService: TeamDataService
    ) {}

    public ngOnInit(): void {
        console.log(this.semesterId());
        this.game$ = this._gameDataService.getGameByUserIdAndSemesterId(this.userId(), this.semesterId())
            .pipe(
                tap((game: GameModel) => {
                    this.team$ = this._teamDataService.getTeamById(game.teamId);
                })
            );
        this.role$ = this._roleDataService.getRoleByUserIdAndSemesterId(this.userId(), this.semesterId());
    }
}
