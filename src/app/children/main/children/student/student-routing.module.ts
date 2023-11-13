import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     component: MainLayoutComponent,
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: 'show-games',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: 'show-games',
    //             component: ShowGamesPageComponent
    //         },
    //         {
    //             path: 'about-games',
    //             component: AboutGamesPageComponent
    //         }
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule { }
