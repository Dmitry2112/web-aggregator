import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'main-footer',
    templateUrl: './main-footer.component.html',
    styleUrls: ['./styles/main-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink]
})
export class MainFooterComponent { }
