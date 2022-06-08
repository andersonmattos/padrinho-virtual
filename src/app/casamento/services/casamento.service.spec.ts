import { TestBed } from '@angular/core/testing';

import { CasamentoService } from './casamento.service';

describe('CasamentoService', () => {
  let service: CasamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
