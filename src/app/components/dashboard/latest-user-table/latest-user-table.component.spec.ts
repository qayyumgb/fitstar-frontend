import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUserTableComponent } from './latest-user-table.component';

describe('LatestUserTableComponent', () => {
  let component: LatestUserTableComponent;
  let fixture: ComponentFixture<LatestUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestUserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
