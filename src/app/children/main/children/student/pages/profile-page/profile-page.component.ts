import { ChangeDetectionStrategy, Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../auth/data/services/auth.service';
import { UserDataService } from '../../data/services/user-data.service';
import { map } from 'rxjs';
import { UserModel } from '../../data/models/user.model';
import { ProfileSideBarComponent } from '../../components/profile-side-bar/profile-side-bar.component';

@Component({
    selector: 'profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./styles/profile-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProfileSideBarComponent]
})
export class ProfilePageComponent implements OnInit {
    public userId: Signal<string> = computed(() => this._authService.getUserId());
    public name: WritableSignal<string> = signal('');
    public surname: WritableSignal<string> = signal('');
    public academicGroup: WritableSignal<string> = signal('');

    constructor(
        private _authService: AuthService,
        private _userDataService: UserDataService
    ) { }

    public ngOnInit(): void {
        this._userDataService.getAllUsers()
            .pipe(
                map((users: UserModel[]) => {
                    const filteredUsers: UserModel[] = users.filter((user: UserModel) => user.id === this.userId());

                    return filteredUsers[0];
                })
            )
            .subscribe((user: UserModel) => {
                this.name.set(user.name);
                this.surname.set(user.surname);
                this.academicGroup.set(user.academicGroup);
            });
    }
}
