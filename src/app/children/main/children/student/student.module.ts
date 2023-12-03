import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadGameComponent } from './components/load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from '../../main.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
    declarations: [
        LoadGameComponent,
        ProfilePageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        MainModule,
    ],
    providers: []
})
export class StudentModule { }
