import { TestBed } from '@angular/core/testing';

import { SuppliesService } from './supplies.service';

describe('SuppliesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuppliesService = TestBed.get(SuppliesService);
    expect(service).toBeTruthy();
  });
});
