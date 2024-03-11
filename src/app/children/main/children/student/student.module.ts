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
import { ProfileSideBarComponent } from './components/profile-side-bar/profile-side-bar.component';
import { TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputFilesModule,
    TuiInputModule,
    TuiInputMonthModule, TuiSelectModule,
    TuiTextareaModule
} from '@taiga-ui/kit';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        MainModule,
        ProfileSideBarComponent,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiInputMonthModule,
        TuiTextareaModule,
        TuiInputFilesModule,
        TuiSvgModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        LoadGameComponent,
        ProfilePageComponent,
        ProjectsPageComponent,
        AddProjectPageComponent
    ]
})
export class StudentModule { }
