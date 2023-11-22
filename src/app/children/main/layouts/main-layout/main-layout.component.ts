import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./styles/main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
