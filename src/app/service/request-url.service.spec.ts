import { TestBed } from '@angular/core/testing';

import { RequestUrlService } from './request-url.service';

describe('RequestUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestUrlService = TestBed.get(RequestUrlService);
    expect(service).toBeTruthy();
  });
});
