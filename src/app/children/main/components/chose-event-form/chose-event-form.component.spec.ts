import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseEventFormComponent } from './chose-event-form.component';

describe('ChoseEventFormComponent', () => {
  let component: ChoseEventFormComponent;
  let fixture: ComponentFixture<ChoseEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseEventFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoseEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
