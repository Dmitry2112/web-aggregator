import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { ShowGamesPageComponent } from './pages/show-games-page/show-games-page.component';
import { GamesComponent } from './components/games/games.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { AboutGamePageComponent } from './pages/about-game-page/about-game-page.component';
import { PlayGamePageComponent } from './pages/play-game-page/play-game-page.component';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TuiButtonModule,
        TuiDataListWrapperModule,
        TuiComboBoxModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiSelectModule,
        MainLayoutComponent,
        MainHeaderComponent,
        MainFooterComponent,
        ShowGamesPageComponent,
        GamesComponent,
        GameCardComponent,
        AboutGamePageComponent,
        PlayGamePageComponent
    ],
    exports: [
        MainLayoutComponent
    ]
})
export class MainModule { }
