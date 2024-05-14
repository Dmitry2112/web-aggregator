import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { SecurityPageComponent } from './pages/security-page/security-page.component';

export const STUDENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    },
    {
        path: 'projects',
        component: ProjectsPageComponent
    },
    {
        path: 'add-project',
        component: AddProjectPageComponent
    },
    {
        path: 'security',
        component: SecurityPageComponent
    }
];
