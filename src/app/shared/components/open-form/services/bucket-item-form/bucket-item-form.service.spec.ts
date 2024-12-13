import { TestBed } from '@angular/core/testing';

import { BucketItemFormService } from './bucket-item-form.service';

describe('BucketItemFormService', () => {
  let service: BucketItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucketItemFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
