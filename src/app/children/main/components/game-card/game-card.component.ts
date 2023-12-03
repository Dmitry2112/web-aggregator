import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGameResponseModel } from '../../data/response-models/game.response-model.interface';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./styles/game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
    @Input()
    public game?: IGameResponseModel;
}
