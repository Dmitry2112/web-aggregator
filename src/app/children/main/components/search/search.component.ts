import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'search',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    providers: [TuiDestroyService],
    templateUrl: './search.component.html',
    styleUrl: './styles/search.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    public searchForm: FormGroup = new FormGroup({
        gameName: new FormControl('', Validators.required),
    });

    constructor(
        private _filterService: FilterService,
        private _destroy$: TuiDestroyService,
    ) {}

    public ngOnInit(): void {
        this.searchForm.controls['gameName'].valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap((gameName: string) => {
                    this._filterService.changeGameName(gameName);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
