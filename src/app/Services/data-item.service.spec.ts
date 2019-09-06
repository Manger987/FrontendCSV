import { TestBed } from '@angular/core/testing';

import { DataItemService } from './data-item.service';

describe('DataItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataItemService = TestBed.get(DataItemService);
    expect(service).toBeTruthy();
  });
});
