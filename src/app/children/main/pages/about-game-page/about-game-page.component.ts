import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'about-game-page',
    templateUrl: './about-game-page.component.html',
    styleUrls: ['./styles/about-game-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutGamePageComponent implements OnInit {
    public gameId: WritableSignal<string> = signal('');
    constructor(private _route: ActivatedRoute) { }

    //TODO: реализовать отписку
    public ngOnInit(): void {
        this._route.params
            .subscribe((params: Params) => {
                this.gameId.set(params['gameId']);
            });
    }
}
