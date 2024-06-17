import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardAdminComponent } from './game-card-admin.component';

describe('GameCardAdminComponent', () => {
  let component: GameCardAdminComponent;
  let fixture: ComponentFixture<GameCardAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCardAdminComponent]
    });
    fixture = TestBed.createComponent(GameCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
