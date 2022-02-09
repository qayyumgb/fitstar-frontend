import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorListingComponent } from './collaborator-listing.component';

describe('CollaboratorListingComponent', () => {
  let component: CollaboratorListingComponent;
  let fixture: ComponentFixture<CollaboratorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
