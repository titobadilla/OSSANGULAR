import { TestBed } from '@angular/core/testing';

import { ListToolWorkOrderService } from './list-tool-work-order.service';

describe('ListToolWorkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListToolWorkOrderService = TestBed.get(ListToolWorkOrderService);
    expect(service).toBeTruthy();
  });
});
