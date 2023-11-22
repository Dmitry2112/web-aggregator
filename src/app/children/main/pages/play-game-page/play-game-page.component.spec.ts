import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGamePageComponent } from './play-game-page.component';

describe('PlayGamePageComponent', () => {
  let component: PlayGamePageComponent;
  let fixture: ComponentFixture<PlayGamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayGamePageComponent]
    });
    fixture = TestBed.createComponent(PlayGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
