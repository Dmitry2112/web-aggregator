import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ShowGamesPageComponent } from './pages/show-games-page/show-games-page.component';
import { AboutGamesPageComponent } from './pages/about-games-page/about-games-page.component';

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
                path: 'about-games/:gameId',
                component: AboutGamesPageComponent
            },
            {
                path: 'student',
                loadChildren: () => import('./children/student/student-routing.module').then(module => module.StudentRoutingModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
