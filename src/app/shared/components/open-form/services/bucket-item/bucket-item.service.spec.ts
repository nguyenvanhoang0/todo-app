import { TestBed } from '@angular/core/testing';

import { BucketItemService } from './bucket-item.service';

describe('BucketItemService', () => {
  let service: BucketItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucketItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
