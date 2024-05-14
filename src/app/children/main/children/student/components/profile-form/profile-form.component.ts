import { ChangeDetectionStrategy, Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { AuthService } from '../../../auth/data/services/auth.service';
import { UserDataService } from '../../data/services/user-data.service';
import { map } from 'rxjs';
import { UserModel } from '../../data/models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { IUserUpdateRequestModel } from '../../data/request-models/user-update.request-model.interface';

@Component({
    selector: 'profile-form',
    standalone: true,
    imports: [
        ProfileSideBarComponent,
        ReactiveFormsModule,
        AsyncPipe,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiSelectModule,
        TuiButtonModule
    ],
    templateUrl: './profile-form.component.html',
    styleUrl: './styles/profile-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements OnInit {
    public userId: Signal<string> = computed(() => this._authService.getUserId());
    public name: WritableSignal<string> = signal('');
    public surname: WritableSignal<string> = signal('');
    public academicGroup: WritableSignal<string> = signal('');
    public email: WritableSignal<string> = signal('');

    public profileForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
    });

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
                this.email.set(user.email);

                this.profileForm.controls['name'].setValue(user.name);
                this.profileForm.controls['surname'].setValue(user.surname);
            });
    }

    public onSubmit(): void {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();

            return;
        }

        const updateUser: IUserUpdateRequestModel = {
            email: this.email(),
            name: this.profileForm.controls['name'].value,
            surname: this.profileForm.controls['surname'].value,
            password: 'QWEasd123',
            academicGroup: this.academicGroup()
        };

        console.log(updateUser);

        this._userDataService.updateUser(this.userId(), updateUser).subscribe();
    }
}
