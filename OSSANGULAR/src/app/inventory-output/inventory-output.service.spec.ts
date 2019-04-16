import { TestBed } from '@angular/core/testing';

import { InventoryOutputService } from './inventory-output.service';

describe('InventoryOutputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryOutputService = TestBed.get(InventoryOutputService);
    expect(service).toBeTruthy();
  });
});
