import { TestBed } from '@angular/core/testing';

import { SharePostService } from './share-post.service';

describe('SharePostService', () => {
  let service: SharePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
