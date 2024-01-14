import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameDataService } from '../../../../data/services/game-data.service';
import { LoadGameViewModel } from '../../view-models/load-game.view-model';
import { finalize, map, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { TuiFileLike } from '@taiga-ui/kit';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html',
    styleUrls: ['./styles/load-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadGameComponent {
    public readonly control: FormControl = new FormControl();

    public readonly rejectedFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    public readonly loadingFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    public readonly loadedFiles$: Observable<TuiFileLike | null> = this.control.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );

    public categories: string[] = [
        'Развлекательные',
    ];

    public chooseCategory: FormControl<string> = new FormControl();

    public themes: string[] = [
        'Аркады',
    ];

    public chooseTheme: FormControl<string> = new FormControl();

    public loadGameViewModel: LoadGameViewModel = new LoadGameViewModel();
    public loadGameForm: FormGroup = this.loadGameViewModel.loadGameForm;

    constructor(private _gameDataService: GameDataService) { }

    // public onFileSelected(event: any): void {
    //     this.loadGameViewModel.gameFile = event.target.files[0];
    // }

    public onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    public removeFile(): void {
        this.control.setValue(null);
    }

    public clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }

    public makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);

        return timer(1000).pipe(
            map(() => {
                if (Math.random() > 0.1) {
                    return file;
                }

                this.rejectedFiles$.next(file);

                return null;
            }),
            finalize(() => this.loadingFiles$.next(null)),
        );
    }

    public onSubmit(): void {
        if (this.loadGameForm.invalid && !this.control.value) {
            this.loadGameForm.markAllAsTouched();

            return;
        }
        this.loadGameViewModel.gameFile = this.control.value;
        alert('Игра отправлена');
        //this._gameDataService.addGame(this.loadGameViewModel.toModel()).subscribe(() => alert('Игра загружена'));
    }
}
