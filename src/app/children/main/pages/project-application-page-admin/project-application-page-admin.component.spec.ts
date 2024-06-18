import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApplicationPageAdminComponent } from './project-application-page-admin.component';

describe('ProjectApplicationPageAdminComponent', () => {
  let component: ProjectApplicationPageAdminComponent;
  let fixture: ComponentFixture<ProjectApplicationPageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectApplicationPageAdminComponent]
    });
    fixture = TestBed.createComponent(ProjectApplicationPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
