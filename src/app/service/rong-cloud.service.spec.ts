import { TestBed } from '@angular/core/testing';

import { RongCloudService } from './rong-cloud.service';

describe('RongCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RongCloudService = TestBed.get(RongCloudService);
    expect(service).toBeTruthy();
  });
});
