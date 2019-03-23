import { TestBed } from '@angular/core/testing';

import { KitWorkOrderService } from './kit-work-order.service';

describe('KitWorkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KitWorkOrderService = TestBed.get(KitWorkOrderService);
    expect(service).toBeTruthy();
  });
});
