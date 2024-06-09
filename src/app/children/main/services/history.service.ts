import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    public historyGames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor() { }

    public addGameInHistory(gameId: string): void {
        if (this.historyGames$.value.includes(gameId)) {
            return;
        }

        if (this.historyGames$.value.length === 3) {
            this.historyGames$.next([...this.historyGames$.value.slice(1), gameId]);
        } else {
            this.historyGames$.next([...this.historyGames$.value, gameId]);
        }
    }
}
