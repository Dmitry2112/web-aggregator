import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGamesPageComponent } from './show-games-page.component';

describe('ShowProjectsPageComponent', () => {
  let component: ShowGamesPageComponent;
  let fixture: ComponentFixture<ShowGamesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGamesPageComponent]
    });
    fixture = TestBed.createComponent(ShowGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
