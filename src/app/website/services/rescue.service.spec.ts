import { TestBed, inject } from '@angular/core/testing';

import { RescueService } from './rescue.service';

describe('RescueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RescueService]
    });
  });

  it('should be created', inject([RescueService], (service: RescueService) => {
    expect(service).toBeTruthy();
  }));
});
