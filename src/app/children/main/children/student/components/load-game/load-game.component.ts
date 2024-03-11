import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameDataService } from '../../../../data/services/game-data.service';
import { LoadGameViewModel } from '../../view-models/load-game.view-model';
import { finalize, map, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { TuiFileLike, TuiInputModule, TuiTextareaModule, TuiSelectModule, TuiDataListWrapperModule, TuiInputFilesModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiAlertService, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiTextfieldControllerModule, TuiDataListModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiFilesModule } from '@taiga-ui/kit/components/files';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'load-game',
    templateUrl: './load-game.component.html',
    styleUrls: ['./styles/load-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiErrorModule,
        TuiTextareaModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        NgIf,
        TuiInputFilesModule,
        TuiFilesModule,
        TuiButtonModule,
        AsyncPipe,
        TuiFieldErrorPipeModule
    ]
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

    constructor(
        private _gameDataService: GameDataService,
        @Inject(TuiAlertService) private readonly _alerts: TuiAlertService
    ) { }

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

    public showSubmitGameNotification(): void {
        this._alerts
            .open('', { label: 'Игра отправлена' })
            .subscribe();
    }

    public showLoadGameSuccess(): void {
        this._alerts
            .open('', { label: 'Игра успешно загружена!', status: 'success' })
            .subscribe();
    }

    public onSubmit(): void {
        if (this.loadGameForm.invalid && !this.control.value) {
            this.loadGameForm.markAllAsTouched();

            return;
        }
        this.loadGameViewModel.gameFile = this.control.value;
        this.showSubmitGameNotification();
        this._gameDataService.addGame(this.loadGameViewModel.toModel()).subscribe(() => this.showLoadGameSuccess());
    }
}
