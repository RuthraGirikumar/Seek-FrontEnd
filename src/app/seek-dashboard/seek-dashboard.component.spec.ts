import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekDashboardComponent } from './seek-dashboard.component';

describe('SeekDashboardComponent', () => {
  let component: SeekDashboardComponent;
  let fixture: ComponentFixture<SeekDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
