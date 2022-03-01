import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmbassadorComponent } from './add-ambassador.component';

describe('AddAmbassadorComponent', () => {
  let component: AddAmbassadorComponent;
  let fixture: ComponentFixture<AddAmbassadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAmbassadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmbassadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
