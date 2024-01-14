import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'show-games-page',
    templateUrl: './show-games-page.component.html',
    styleUrls: ['./styles/show-projects-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowGamesPageComponent {
    public events: string[] = [
        'Осень 2023',
    ];

    public chooseEvent: FormControl<string> = new FormControl();
}
