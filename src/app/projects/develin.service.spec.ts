import { TestBed } from '@angular/core/testing';

import { DevelinService } from './develin.service';

describe('DevelinService', () => {
  let service: DevelinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
