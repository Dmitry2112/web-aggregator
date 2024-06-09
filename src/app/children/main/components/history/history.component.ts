import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HistoryCardComponent } from '../history-card/history-card.component';
import { HistoryService } from '../../services/history.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'history',
    standalone: true,
    imports: [
        HistoryCardComponent,
        AsyncPipe
    ],
    templateUrl: './history.component.html',
    styleUrl: './styles/history.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {
    public historyGames$: BehaviorSubject<string[]> = this._historyService.historyGames$;

    constructor(private _historyService: HistoryService) {}
}
