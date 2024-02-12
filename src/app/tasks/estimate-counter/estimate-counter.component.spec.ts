import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateCounterComponent } from './estimate-counter.component';

describe('EstimateCounterComponent', () => {
  let component: EstimateCounterComponent;
  let fixture: ComponentFixture<EstimateCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimateCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimateCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
