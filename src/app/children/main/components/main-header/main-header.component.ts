import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./styles/main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
    public showMenu: boolean = false;

    public show(): void {
        this.showMenu = !this.showMenu;
    }
}
