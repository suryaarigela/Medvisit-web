import { TestBed } from '@angular/core/testing';

import { SpecialitySerService } from './speciality-ser.service';

describe('SpecialitySerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialitySerService = TestBed.get(SpecialitySerService);
    expect(service).toBeTruthy();
  });
});
