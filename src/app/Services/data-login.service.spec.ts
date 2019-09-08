import { TestBed } from '@angular/core/testing';

import { DataLoginService } from './data-login.service';

describe('DataLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataLoginService = TestBed.get(DataLoginService);
    expect(service).toBeTruthy();
  });
});
