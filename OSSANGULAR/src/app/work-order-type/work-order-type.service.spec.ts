import { TestBed } from '@angular/core/testing';

import { WorkOrderTypeService } from './work-order-type.service';

describe('WorkOrderTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkOrderTypeService = TestBed.get(WorkOrderTypeService);
    expect(service).toBeTruthy();
  });
});
