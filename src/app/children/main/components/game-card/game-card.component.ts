import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameModel } from '../../data/models/game.model';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./styles/game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
    @Input({ required: true })
    public game!: GameModel;
}
