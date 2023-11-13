import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadGameComponent } from './components/load-game/load-game.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: LoadGameComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule { }
