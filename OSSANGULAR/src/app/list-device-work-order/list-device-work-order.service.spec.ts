import { TestBed } from '@angular/core/testing';

import { ListDeviceWorkOrderService } from './list-device-work-order.service';

describe('ListDeviceWorkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListDeviceWorkOrderService = TestBed.get(ListDeviceWorkOrderService);
    expect(service).toBeTruthy();
  });
});
