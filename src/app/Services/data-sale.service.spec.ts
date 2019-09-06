import { TestBed } from '@angular/core/testing';

import { DataSaleService } from './data-sale.service';

describe('DataSaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSaleService = TestBed.get(DataSaleService);
    expect(service).toBeTruthy();
  });
});
