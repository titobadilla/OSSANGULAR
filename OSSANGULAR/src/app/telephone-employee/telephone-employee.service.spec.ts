import { TestBed } from '@angular/core/testing';

import { TelephoneEmployeeService } from './telephone-employee.service';

describe('TelephoneEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelephoneEmployeeService = TestBed.get(TelephoneEmployeeService);
    expect(service).toBeTruthy();
  });
});
