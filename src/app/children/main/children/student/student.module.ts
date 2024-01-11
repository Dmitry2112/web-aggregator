import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadGameComponent } from './components/load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from '../../main.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';

@NgModule({
    declarations: [
        LoadGameComponent,
        ProfilePageComponent,
        ProjectsPageComponent,
        AddProjectPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        MainModule,
        ProfileNavComponent
    ],
    providers: []
})
export class StudentModule { }
