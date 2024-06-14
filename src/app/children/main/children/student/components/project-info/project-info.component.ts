import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';
import { AuthService } from '../../../auth/data/services/auth.service';

@Component({
    selector: 'project-info',
    standalone: true,
    imports: [],
    templateUrl: './project-info.component.html',
    styleUrl: './styles/project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent {
    public semesterId: InputSignal<string> = input.required<string>();
    public userId: Signal<string> = computed(() => this._authService.getUserId());

    constructor(private _authService: AuthService) {}
}
