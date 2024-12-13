import { TestBed } from '@angular/core/testing';

import { BucketFormService } from './bucket-form.service';

describe('BucketFormService', () => {
  let service: BucketFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucketFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
