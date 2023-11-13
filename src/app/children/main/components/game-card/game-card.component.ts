import { Component, Input } from '@angular/core';
import { IGame } from '../../data/interfaces/game.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./styles/game-card.component.scss']
})
export class GameCardComponent {
    @Input()
    public game?: IGame;

    constructor(private _router: Router) {
    }

    // public play(id: string): void {
    //     this._router.navigate([`students`]);
    // }
}
