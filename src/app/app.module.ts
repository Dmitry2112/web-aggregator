import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadGameComponent } from './components/load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameDataService } from './services/game-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        LoadGameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        GameDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
