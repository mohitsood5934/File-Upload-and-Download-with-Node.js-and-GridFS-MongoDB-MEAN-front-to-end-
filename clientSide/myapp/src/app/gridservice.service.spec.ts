import { TestBed } from '@angular/core/testing';

import { GridserviceService } from './gridservice.service';

describe('GridserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridserviceService = TestBed.get(GridserviceService);
    expect(service).toBeTruthy();
  });
});
