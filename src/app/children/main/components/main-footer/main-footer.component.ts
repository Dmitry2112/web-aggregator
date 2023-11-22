import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'main-footer',
    templateUrl: './main-footer.component.html',
    styleUrls: ['./styles/main-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFooterComponent { }
