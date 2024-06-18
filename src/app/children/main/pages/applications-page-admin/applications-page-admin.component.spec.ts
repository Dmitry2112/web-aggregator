import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsPageAdminComponent } from './applications-page-admin.component';

describe('ShowProjectsPageComponent', () => {
  let component: ApplicationsPageAdminComponent;
  let fixture: ComponentFixture<ApplicationsPageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsPageAdminComponent]
    });
    fixture = TestBed.createComponent(ApplicationsPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
