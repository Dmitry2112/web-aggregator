import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'validation-message',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./styles/validation-message.component.scss'],
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
    @Input()
    public control!: AbstractControl;

    @Input()
    public errorMessage?: string;
}
