import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarphChartComponent } from './garph-chart.component';

describe('GarphChartComponent', () => {
  let component: GarphChartComponent;
  let fixture: ComponentFixture<GarphChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarphChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
