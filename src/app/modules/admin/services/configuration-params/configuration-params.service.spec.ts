import { TestBed } from '@angular/core/testing';

import { ConfigurationParamsService } from './configuration-params.service';

describe('ConfigurationParamsService', () => {
  let service: ConfigurationParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
