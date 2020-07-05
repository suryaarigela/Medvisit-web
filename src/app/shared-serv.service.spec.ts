import { TestBed } from '@angular/core/testing';

import { SharedServService } from './shared-serv.service';

describe('SharedServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedServService = TestBed.get(SharedServService);
    expect(service).toBeTruthy();
  });
});
