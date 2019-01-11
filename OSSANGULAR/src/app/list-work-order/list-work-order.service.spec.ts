import { TestBed } from '@angular/core/testing';

import { ListWorkOrderService } from './list-work-order.service';

describe('ListWorkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListWorkOrderService = TestBed.get(ListWorkOrderService);
    expect(service).toBeTruthy();
  });
});
