import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesFormComponent } from './filter-form.component';

describe('FilterFormComponent', () => {
  let component: ThemesFormComponent;
  let fixture: ComponentFixture<ThemesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
