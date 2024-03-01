import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./styles/not-found-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink]
})
export class NotFoundPageComponent { }
