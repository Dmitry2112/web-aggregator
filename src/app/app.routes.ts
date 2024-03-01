import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'cabinet',
        pathMatch: 'full'
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./children/main/main.routes').then(m => m.MAIN_ROUTES),
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
