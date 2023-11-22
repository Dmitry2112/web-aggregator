import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGamePageComponent } from './about-game-page.component';

describe('AboutGamesPageComponent', () => {
  let component: AboutGamePageComponent;
  let fixture: ComponentFixture<AboutGamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutGamePageComponent]
    });
    fixture = TestBed.createComponent(AboutGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
