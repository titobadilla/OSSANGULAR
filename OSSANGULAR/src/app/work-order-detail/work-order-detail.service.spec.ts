import { TestBed } from '@angular/core/testing';

import { WorkOrderDetailService } from './work-order-detail.service';

describe('WorkOrderDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkOrderDetailService = TestBed.get(WorkOrderDetailService);
    expect(service).toBeTruthy();
  });
});
