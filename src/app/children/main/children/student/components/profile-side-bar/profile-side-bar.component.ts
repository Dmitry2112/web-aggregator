import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, InputSignal, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileNavComponent } from '../profile-nav/profile-nav.component';
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'profile-side-bar',
    standalone: true,
    imports: [CommonModule, ProfileNavComponent, RouterLink, TuiButtonModule],
    templateUrl: './profile-side-bar.component.html',
    styleUrls: ['./styles/profile-side-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSideBarComponent {
    @Input()
    public actionName!: string;

    @Output()
    public submitEvent: EventEmitter<void> = new EventEmitter<void>();

    public isTeamLead: InputSignal<boolean> = input<boolean>(false);

    public emit(): void {
        this.submitEvent.emit();
    }
}
