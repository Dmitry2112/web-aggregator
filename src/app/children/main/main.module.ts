import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { ShowGamesPageComponent } from './pages/show-games-page/show-games-page.component';
import { GameDataService } from './data/services/game-data.service';
import { GamesComponent } from './components/games/games.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { AboutGamePageComponent } from './pages/about-game-page/about-game-page.component';
import { PlayGamePageComponent } from './pages/play-game-page/play-game-page.component';
import { CategoryDataService } from './data/services/category-data.service';
import { ThemeDataService } from './data/services/theme-data.service';

@NgModule({
    declarations: [
        MainLayoutComponent,
        MainHeaderComponent,
        MainFooterComponent,
        ShowGamesPageComponent,
        GamesComponent,
        GameCardComponent,
        AboutGamePageComponent,
        PlayGamePageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        MainLayoutComponent
    ],
    providers: [
        GameDataService,
        CategoryDataService,
        ThemeDataService
    ]
})
export class MainModule { }
