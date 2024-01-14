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
import { ProfileSideBarComponent } from './components/profile-side-bar/profile-side-bar.component';
import { UserDataService } from './data/services/user-data.service';
import { TuiButtonModule } from '@taiga-ui/core';

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
        ProfileSideBarComponent,
        TuiButtonModule
    ],
    providers: [
        UserDataService
    ]
})
export class StudentModule { }
