import { Component, Input } from '@angular/core';
import { IGame } from '../../data/interfaces/game.interface';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./styles/game-card.component.scss']
})
export class GameCardComponent {
    @Input()
    public game?: IGame;
}
