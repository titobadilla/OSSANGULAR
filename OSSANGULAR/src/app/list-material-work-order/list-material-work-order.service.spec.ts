import { TestBed } from '@angular/core/testing';

import { ListMaterialWorkOrderService } from './list-material-work-order.service';

describe('ListMaterialWorkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListMaterialWorkOrderService = TestBed.get(ListMaterialWorkOrderService);
    expect(service).toBeTruthy();
  });
});
