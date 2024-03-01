import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cabinet',
        pathMatch: 'full'
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./children/main/main-routing.module').then(module => module.MainRoutingModule),
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
