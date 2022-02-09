import { TestBed } from '@angular/core/testing';

import { SponserService } from './sponser.service';

describe('SponserService', () => {
  let service: SponserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
