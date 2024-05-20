import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ShowGamesPageComponent } from './pages/show-games-page/show-games-page.component';
import { AboutGamePageComponent } from './pages/about-game-page/about-game-page.component';
import { PlayGamePageComponent } from './pages/play-game-page/play-game-page.component';
import { authGuard } from './children/auth/guards/auth.guard';

export const MAIN_ROUTES: Routes = [
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
                path: 'auth',
                loadChildren: () => import('./children/auth/auth.routes').then(m => m.AUTH_ROUTES)
            },
            {
                path: 'student',
                // canActivate: [authGuard],
                loadChildren: () => import('./children/student/student.routes').then(m => m.STUDENT_ROUTES)
            }
        ]
    }
];
