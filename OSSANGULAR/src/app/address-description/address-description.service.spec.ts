import { TestBed } from '@angular/core/testing';

import { AddressDescriptionService } from './address-description.service';

describe('AddressDescriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressDescriptionService = TestBed.get(AddressDescriptionService);
    expect(service).toBeTruthy();
  });
});
