import { TestBed } from '@angular/core/testing';

import { LandinpPageService } from './landinp-page.service';

describe('LandinpPageService', () => {
  let service: LandinpPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandinpPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
