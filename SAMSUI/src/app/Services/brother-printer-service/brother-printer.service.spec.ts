import { TestBed } from '@angular/core/testing';

import { BrotherPrinterService } from './brother-printer.service';

describe('BrotherPrinterService', () => {
  let service: BrotherPrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrotherPrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
