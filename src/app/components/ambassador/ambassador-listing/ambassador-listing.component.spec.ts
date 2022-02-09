import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorListingComponent } from './ambassador-listing.component';

describe('AmbassadorListingComponent', () => {
  let component: AmbassadorListingComponent;
  let fixture: ComponentFixture<AmbassadorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbassadorListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
