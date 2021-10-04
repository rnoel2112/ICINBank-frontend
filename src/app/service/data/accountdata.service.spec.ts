import { TestBed } from '@angular/core/testing';

import { AccountdataService } from './accountdata.service';

describe('AccountdataService', () => {
  let service: AccountdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
