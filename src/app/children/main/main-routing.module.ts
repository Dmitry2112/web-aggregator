import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ShowGamesPageComponent } from './pages/show-games-page/show-games-page.component';
import { AboutGamePageComponent } from './pages/about-game-page/about-game-page.component';
import { PlayGamePageComponent } from './pages/play-game-page/play-game-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'show-games',
                pathMatch: 'full'
            },
            {
                path: 'show-games',
                component: ShowGamesPageComponent
            },
            {
                path: 'about-game/:gameId',
                component: AboutGamePageComponent
            },
            {
                path: 'play-game/:gameId',
                component: PlayGamePageComponent
            },
            {
                path: 'student',
                loadChildren: () => import('./children/student/student-routing.module').then(module => module.StudentRoutingModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
