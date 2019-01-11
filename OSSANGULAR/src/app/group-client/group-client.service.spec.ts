import { TestBed } from '@angular/core/testing';

import { GroupClientService } from './group-client.service';

describe('GroupClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupClientService = TestBed.get(GroupClientService);
    expect(service).toBeTruthy();
  });
});
