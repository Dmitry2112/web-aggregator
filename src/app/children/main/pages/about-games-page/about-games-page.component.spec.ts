import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGamesPageComponent } from './about-games-page.component';

describe('AboutGamesPageComponent', () => {
  let component: AboutGamesPageComponent;
  let fixture: ComponentFixture<AboutGamesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutGamesPageComponent]
    });
    fixture = TestBed.createComponent(AboutGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
