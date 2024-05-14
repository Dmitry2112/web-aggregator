import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPageComponent } from './security-page.component';

describe('ProjectsPageComponent', () => {
  let component: SecurityPageComponent;
  let fixture: ComponentFixture<SecurityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityPageComponent]
    });
    fixture = TestBed.createComponent(SecurityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
