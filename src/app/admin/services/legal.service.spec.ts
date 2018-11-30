import { TestBed, inject } from '@angular/core/testing';

import { LegalService } from './legal.service';

describe('LegalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalService]
    });
  });

  it('should be created', inject([LegalService], (service: LegalService) => {
    expect(service).toBeTruthy();
  }));
});
