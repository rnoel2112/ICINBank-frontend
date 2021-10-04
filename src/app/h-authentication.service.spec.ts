import { TestBed } from '@angular/core/testing';

import { HAuthenticationService } from './h-authentication.service';

describe('HAuthenticationService', () => {
  let service: HAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
