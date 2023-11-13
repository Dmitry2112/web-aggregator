import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'student', //TODO: Здесь должен быть редирект на guest
        pathMatch: 'full'
    },
    {
        path: 'student',
        loadChildren: () => import('./children/student/student-routing.module').then(module => module.StudentRoutingModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
