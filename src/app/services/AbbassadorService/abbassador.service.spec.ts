import { TestBed } from '@angular/core/testing';

import { AbbassadorService } from './abbassador.service';

describe('AbbassadorService', () => {
  let service: AbbassadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbbassadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
