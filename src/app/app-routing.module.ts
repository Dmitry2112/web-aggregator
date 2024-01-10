import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
