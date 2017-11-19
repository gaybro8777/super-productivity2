import { TestBed, inject } from '@angular/core/testing';

import { ParseDurationService } from './parse-duration.service';

describe('ParseDurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseDurationService]
    });
  });

  it('should be created', inject([ParseDurationService], (service: ParseDurationService) => {
    expect(service).toBeTruthy();
  }));
});
