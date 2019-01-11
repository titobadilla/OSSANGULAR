import { TestBed } from '@angular/core/testing';

import { TelephoneClientService } from './telephone-client.service';

describe('TelephoneClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelephoneClientService = TestBed.get(TelephoneClientService);
    expect(service).toBeTruthy();
  });
});
