import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGameComponent } from './load-game.component';

describe('ProfilePageComponent', () => {
    let component: LoadGameComponent;
    let fixture: ComponentFixture<LoadGameComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoadGameComponent]
        });
        fixture = TestBed.createComponent(LoadGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
